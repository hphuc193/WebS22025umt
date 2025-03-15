export const typeDef = `
    type Category {
        _id: ID!
        name: String! 
    } 

    input CategoryInput {
      name: String!
    }

    extend type Query {
        categories: [Category]
        category(_id: ID!): Category
    }

    extend type Mutation {
      deleteCategory(_id: ID!): Int
      createCategory(input: CategoryInput!): Category
      updateCategory(_id: ID!, input: CategoryInput!): Category
    }
`;


export const resolvers = {
    Query: {
      categories: (parent, args, context, info) => {
        return context.db.categories.getAll();
      },
      category: (parent, args, context, info) => {
        return context.db.categories.findById(args._id);
      },
    },
    Mutation: {
      deleteCategory: (parent, args, context, info) => {
        return context.db.categories.deleteById(args._id);
      },
      createCategory: (parent, args, context, info) => {
        return context.db.categories.create(args.input);
      },

      updateCategory: (parent, args, context, info) => {
        return context.db.categories.updateById(args._id, args.input);
      },

      // findById: async (id) => await Category.findById(id),
      // deleteById: async (id) => {
      //   const result = await Category.findByIdAndDelete(id);
      //   return result != null;
      // },

      // updateById: async (id, { name }) => {
      //   const result = await Category.findOneAndUpdate({ _id: id }, { name });
      //   if (result != null) {
      //     return await Category.findById(id);
      //   }
      //   return result;
      // },

    },
    
};