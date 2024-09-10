import dayjs from 'dayjs'
import { client, db } from '.'
import { goalCompletions, goals } from './schema'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      { title: 'Go to the Gym', desiredWeeklyFrequency: 5 },
      { title: 'Drink water', desiredWeeklyFrequency: 10 },
      { title: 'Learning english language', desiredWeeklyFrequency: 20 },
    ])
    .returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalID: result[0].id, createdAt: startOfWeek.toDate() },
    { goalID: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
