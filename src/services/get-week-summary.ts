import dayjs from 'dayjs'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import { and, count, eq, gte, lte, sql } from 'drizzle-orm'

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCreatedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalCompletionInWeek = db.$with('goal_completion_in_week').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql /*sql*/`DATE(${goalCompletions.createdAt})`.as(
          'completedAtDate'
        ),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalID))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  )

  const goalsCompletedByWeekDay = db.$with('goals_completed_by_week_day').as(
    db
      .select({
        completedAtDate: goalCompletionInWeek.completedAtDate,
        completions: sql /*sql*/`JSON_AGG(JSON_BUILD_OBJECT(
          'id', ${goalCompletionInWeek.id},
          'title', ${goalCompletionInWeek.title},
          'completedAt', ${goalCompletionInWeek.completedAt}
        ))`.as('completions'),
      })
      .from(goalCompletionInWeek)
      .groupBy(goalCompletionInWeek.completedAtDate)
  )

  const result = await db
    .with(goalsCreatedUpToWeek, goalCompletionInWeek, goalsCompletedByWeekDay)
    .select({
      completed:
        sql /*sql*/`(SELECT COUNT(*) FROM ${goalCompletionInWeek})`.mapWith(
          Number
        ),
      total:
        sql /*sql*/`(SELECT SUM(${goalsCreatedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreatedUpToWeek})`.mapWith(
          Number
        ),
      goalsPerDay: sql /*sql*/`JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate}, ${goalsCompletedByWeekDay.completions}
        )`,
    })
    .from(goalsCompletedByWeekDay)

  return {
    summary: result,
  }
}
