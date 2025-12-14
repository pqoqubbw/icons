/**
 * @fileoverview ESLint rule to enforce UPPER_CASE for module-level const variables (except components)
 */

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce UPPER_CASE naming for module-level const variables in icon files',
    },
    fixable: 'code',
    schema: [],
    messages: {
      notUpperCase:
        "Variable '{{name}}' should be UPPER_CASE: '{{suggestion}}'",
    },
  },

  create(context) {
    function toUpperSnakeCase(name) {
      return name
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        .toUpperCase();
    }

    function isUpperCase(name) {
      return /^[A-Z][A-Z0-9_]*$/.test(name);
    }

    function isIconComponent(name) {
      return /Icon$/.test(name);
    }

    return {
      VariableDeclaration(node) {
        if (node.parent.type !== 'Program') {
          return;
        }

        if (node.kind !== 'const') {
          return;
        }

        for (const declarator of node.declarations) {
          if (declarator.id.type !== 'Identifier') {
            continue;
          }

          const name = declarator.id.name;

          if (isIconComponent(name)) {
            continue;
          }

          if (isUpperCase(name)) {
            continue;
          }

          const suggestion = toUpperSnakeCase(name);

          const scope = context.sourceCode.getScope(node);
          const variable = scope.variables.find((v) => v.name === name);

          if (!variable) {
            continue;
          }

          context.report({
            node: declarator.id,
            messageId: 'notUpperCase',
            data: {
              name,
              suggestion,
            },
            fix(fixer) {
              const fixes = [];
              const sourceCode = context.sourceCode;

              const idNode = declarator.id;
              const idText = sourceCode.getText(idNode);

              const colonIndex = idText.indexOf(':');
              const actualNameLength =
                colonIndex > 0 ? colonIndex : name.length;

              fixes.push(
                fixer.replaceTextRange(
                  [idNode.range[0], idNode.range[0] + actualNameLength],
                  suggestion
                )
              );

              for (const ref of variable.references) {
                if (ref.identifier !== declarator.id) {
                  fixes.push(fixer.replaceText(ref.identifier, suggestion));
                }
              }

              return fixes;
            },
          });
        }
      },
    };
  },
};
