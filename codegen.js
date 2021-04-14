module.exports = {
  schema: [{ 'http://localhost:3000/graphql': {} }],
  documents: ['./client/graphql/*.ts'],
  overwrite: true,
  generates: {
    './client/generated/graphql.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
        apolloReactCommonImportFrom: '@apollo/client',
        apolloReactComponentsImportFrom: '@apollo/client',
        apolloReactHocImportFrom: '@apollo/client',
        apolloReactHooksImportFrom: '@apollo/client',
      },
    },
    './client/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
