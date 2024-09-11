import { z } from 'zod'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { createGoalCompletion } from '../../services/create-goal-completion'

export const createCompletionRoute: FastifyPluginAsyncZod = async app => {
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
}
