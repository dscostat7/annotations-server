import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoal } from '../services/create-goal'
import { getWeekPendingGoals } from '../services/get-week-pending-goals'
import { createGoalCompletion } from '../services/create-goal-completion'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
})

app.post(
  '/goals',
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async request => {
    const { title, desiredWeeklyFrequency } = request.body
    await createGoal({
      title,
      desiredWeeklyFrequency,
    })
  }
)

app.post(
  '/completions',
  {
    schema: {
      body: z.object({
        goalID: z.string(),
      }),
    },
  },
  async request => {
    const { goalID } = request.body
    const result = await createGoalCompletion({
      goalID,
    })

    return result
  }
)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server is runing')
  })
