import { gql } from "@apollo/client";

export const CATEGORIES_QUERY = gql`
  {
    categories {
      _id
      name
    }
  }
`;

// Truy vấn danh mục theo ID
export const CATEGORY_QUERY = gql`
  query Category($id: ID!) {
    category(_id: $id) {
      _id
      name
    }
  }
`;