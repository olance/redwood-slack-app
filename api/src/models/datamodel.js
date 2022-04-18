module.exports = {
  enums: [
    {
      name: 'OrgUserRole',
      values: [
        {
          name: 'OWNER',
          dbName: null,
        },
        {
          name: 'ADMIN',
          dbName: null,
        },
        {
          name: 'MEMBER',
          dbName: null,
        },
      ],
      dbName: null,
    },
  ],
  models: [
    {
      name: 'AppInstallation',
      dbName: null,
      fields: [
        {
          name: 'id',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: true,
          default: {
            name: 'cuid',
            args: [],
          },
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'createdAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: true,
          default: {
            name: 'now',
            args: [],
          },
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'updatedAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: true,
        },
        {
          name: 'botScopes',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'botToken',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'teamId',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'isEnterprise',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'Boolean',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'enterpriseId',
          kind: 'scalar',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'installationData',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'Json',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'organization',
          kind: 'object',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'Organization',
          hasDefaultValue: false,
          relationName: 'AppInstallationToOrganization',
          relationFromFields: [],
          relationToFields: [],
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'slackOrgId',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: true,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
      ],
      isGenerated: false,
      primaryKey: null,
      uniqueFields: [],
      uniqueIndexes: [],
    },
    {
      name: 'Organization',
      dbName: null,
      fields: [
        {
          name: 'id',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: true,
          default: {
            name: 'cuid',
            args: [],
          },
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'slackOrgId',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: true,
          isId: false,
          isReadOnly: true,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'createdAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: true,
          default: {
            name: 'now',
            args: [],
          },
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'updatedAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: true,
        },
        {
          name: 'name',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'appInstallation',
          kind: 'object',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'AppInstallation',
          hasDefaultValue: false,
          relationName: 'AppInstallationToOrganization',
          relationFromFields: ['slackOrgId'],
          relationToFields: ['slackOrgId'],
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'users',
          kind: 'object',
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'OrgUsersMembership',
          hasDefaultValue: false,
          relationName: 'OrgUsersMembershipToOrganization',
          relationFromFields: [],
          relationToFields: [],
          isGenerated: false,
          isUpdatedAt: false,
        },
      ],
      isGenerated: false,
      primaryKey: null,
      uniqueFields: [],
      uniqueIndexes: [],
    },
    {
      name: 'OrgUsersMembership',
      dbName: null,
      fields: [
        {
          name: 'organization',
          kind: 'object',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'Organization',
          hasDefaultValue: false,
          relationName: 'OrgUsersMembershipToOrganization',
          relationFromFields: ['organizationId'],
          relationToFields: ['id'],
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'organizationId',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: true,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'user',
          kind: 'object',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'User',
          hasDefaultValue: false,
          relationName: 'OrgUsersMembershipToUser',
          relationFromFields: ['userId'],
          relationToFields: ['id'],
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'userId',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: true,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'createdAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: true,
          default: {
            name: 'now',
            args: [],
          },
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'updatedAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: true,
        },
        {
          name: 'role',
          kind: 'enum',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'OrgUserRole',
          hasDefaultValue: true,
          default: 'MEMBER',
          isGenerated: false,
          isUpdatedAt: false,
        },
      ],
      isGenerated: false,
      primaryKey: {
        name: null,
        fields: ['organizationId', 'userId'],
      },
      uniqueFields: [],
      uniqueIndexes: [],
    },
    {
      name: 'User',
      dbName: null,
      fields: [
        {
          name: 'id',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: true,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: true,
          default: {
            name: 'cuid',
            args: [],
          },
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'slackId',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'slackOrgId',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'createdAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: true,
          default: {
            name: 'now',
            args: [],
          },
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'updatedAt',
          kind: 'scalar',
          isList: false,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'DateTime',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: true,
        },
        {
          name: 'firstName',
          kind: 'scalar',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'lastName',
          kind: 'scalar',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'fullName',
          kind: 'scalar',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'email',
          kind: 'scalar',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'title',
          kind: 'scalar',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'profilePictureUrl',
          kind: 'scalar',
          isList: false,
          isRequired: false,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'String',
          hasDefaultValue: false,
          isGenerated: false,
          isUpdatedAt: false,
        },
        {
          name: 'organizations',
          kind: 'object',
          isList: true,
          isRequired: true,
          isUnique: false,
          isId: false,
          isReadOnly: false,
          type: 'OrgUsersMembership',
          hasDefaultValue: false,
          relationName: 'OrgUsersMembershipToUser',
          relationFromFields: [],
          relationToFields: [],
          isGenerated: false,
          isUpdatedAt: false,
        },
      ],
      isGenerated: false,
      primaryKey: null,
      uniqueFields: [['slackId', 'slackOrgId']],
      uniqueIndexes: [
        {
          name: null,
          fields: ['slackId', 'slackOrgId'],
        },
      ],
    },
  ],
  types: [],
}
