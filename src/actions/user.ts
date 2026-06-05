'use server'

import { client } from '@/lib/prisma'
import { currentUser } from "@clerk/nextjs/server"

export const onAuthenticatUser = async () => {
    try {
        const user = await currentUser()
        if(!user) {
            return {status: 403, message: "Unauthorized"    }
        }

        const userExists = await client.user.findUnique({
            where: {
                clerkid: user.id,
            },
            include: {
                workspace: {
                    where: {
                        User: {
                            clerkid: user.id,
                        },
                    },
                },
            },
        })

        if (userExists) {
            return {status: 200, message: "User authenticated successfully", user: userExists }
        }
            const newUser = await client.user.create({
                data: {
                    clerkid: user.id,
                    email: user.emailAddresses[0].emailAddress,
                    firstname: user.firstName,
                    lastname: user.lastName,
                    image: user.imageUrl,
                    studio: {
                        create: {},
                    },
                    subscription: {
                        create: {},
                    },
                    workspace: {
                        create: {
                            name: `${user.firstName}'s Workspace`,
                            type: "PERSONAL",
                        },
                    },
                },
                include: {
                    workspace: true,
                },
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            })
            if (newUser){
            return {status: 201, message: "User created and authenticated successfully", user: newUser }
            } else {
                return {status: 500, message: "Failed to create user" }
            }
    } catch (error) {
        console.error("Error occurred while authenticating user:", error)
        return {status: 500, message: "Internal Server Error" }
    }