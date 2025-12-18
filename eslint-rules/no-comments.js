/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow comments in icon files',
    },
    fixable: 'code',
    schema: [],
    messages: {
      noComments: 'Comments are not allowed in icon files',
    },
  },

  create(context) {
    const sourceCode = context.sourceCode;

    return {
      Program() {
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          if (comment.value.trim() === 'use client') {
            continue;
          }

          context.report({
            loc: comment.loc,
            messageId: 'noComments',
            fix(fixer) {
              let removeStart = comment.range[0];
              let removeEnd = comment.range[1];

              const textBefore = sourceCode.text.slice(
                comment.range[0] - 1,
                comment.range[0]
              );
              const textAfter = sourceCode.text.slice(
                comment.range[1],
                comment.range[1] + 1
              );

              if (textBefore === '{' && textAfter === '}') {
                removeStart = comment.range[0] - 1;
                removeEnd = comment.range[1] + 1;
              }

              const lineStart = sourceCode.getIndexFromLoc({
                line: comment.loc.start.line,
                column: 0,
              });
              const lineEnd = sourceCode.getIndexFromLoc({
                line: comment.loc.end.line + 1,
                column: 0,
              });
              const lineText = sourceCode.text.slice(lineStart, lineEnd);
              const trimmedLine = lineText
                .replace(/\{?\s*\/\/.*|\/\*[\s\S]*?\*\/\s*\}?/g, '')
                .trim();

              if (trimmedLine === '') {
                return fixer.removeRange([lineStart, lineEnd]);
              }

              const charBefore = sourceCode.text.slice(
                removeStart - 1,
                removeStart
              );
              if (charBefore === ' ') {
                removeStart -= 1;
              }

              return fixer.removeRange([removeStart, removeEnd]);
            },
          });
        }
      },
    };
  },
};
