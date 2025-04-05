import { authMiddleware } from "./authMiddleware.js";

export const typeDef = `
    type Souvenir {
        _id: ID!
        name: String!
        description: String
        price: Float!
    }

    input SouvenirInput {
        name: String!
        description: String
        price: Float!
    }

    extend type Query {
        souvenirs: [Souvenir]
        souvenir(_id: ID!): Souvenir
    }

    extend type Mutation {
        deleteSouvenir(_id: ID!): DeleteResponse!
        createSouvenir(input: SouvenirInput!): Souvenir
        updateSouvenir(_id: ID!, input: SouvenirInput!): Souvenir
    }

    type DeleteResponse {
        success: Boolean!
        message: String!
    }    
`;

export const resolvers = {
    Query: {
        souvenirs: authMiddleware((parent, args, context, info) => {
            return context.db.souvenirs.getAll();
        }), // Ai cũng có thể xem danh sách

        souvenir: authMiddleware((parent, args, context, info) => {
            return context.db.souvenirs.findById(args._id);
        }), // Ai cũng có thể xem chi tiết
    },

    Mutation: {
        deleteSouvenir: authMiddleware(
            async (parent, args, context, info) => {
                try {
                    const deleted = await context.db.souvenirs.deleteById(args._id);
                    if (!deleted) {
                        return { success: false, message: "Souvenir not found." };
                    }
                    return { success: true, message: "Souvenir deleted successfully." };
                } catch (error) {
                    console.error("Error deleting souvenir:", error);
                    return { success: false, message: "Failed to delete souvenir." };
                }
            },
            ["admin"]
        ),

        createSouvenir: authMiddleware(
            (parent, args, context, info) => {
                return context.db.souvenirs.create(args.input);
            },
            ["admin"]
        ),

        updateSouvenir: authMiddleware(
            (parent, args, context, info) => {
                return context.db.souvenirs.updateById(args._id, args.input);
            },
            ["admin"]
        ),
    },
};
