import * as Sentry from "@sentry/node"
import * as Tracing from "@sentry/tracing"
import { Application } from "express"
import { prismaClient } from "./prisma.config"

const { NODE_ENV, SENTRY_DSN } = process.env

export const getSentryConfig = (app: Application) => ({
    dsn: SENTRY_DSN || undefined,
    environment: NODE_ENV,
    release: "1.0",
    tracesSampleRate: 1.0,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Prisma({ client: prismaClient }),
        new Tracing.Integrations.Express({ app }),
    ],
})
