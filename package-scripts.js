/**
 * Windows: Please do not use trailing comma as windows will fail with token error
 */

const { series, crossEnv, concurrent, rimraf, runInNewWindow } = require('nps-utils');

module.exports = {
    scripts: {
        default: 'nps serve',
        /**
         * Starts the builded app from the dist directory
         */
        start: {
            script: 'set NODE_ENV=development&& node dist/main.js',
            description: 'Starts the builded app from the dist directory'
        },
        /**
         * Serves the current app and watches for changes to restart it
         * eads up: "set NODE_ENV=test && " adds a trailing space to the variable. 
         * I needed "set NODE_ENV=test&& " to avoid the additional space which breaks node apps like Ghost.
         */
        serve: {
            script: series(
                'nps banner.serve',
                'set NODE_ENV=development&& nodemon --watch src --watch .env'
            ),
            description: 'Serves the current app and watches for changes to restart it'
        },
        /**
         * Setup's stuff
         */
        setup: {
            db: {
                script: series(
                    // TODO: Need to handle later
                    // 'nps db.migrate',
                    // 'nps db.seed'
                ),
                description: 'Setup`s the database by migrating and seeding'
            }
        },
        /**
         * Creates the needed configuration files
         */
        config: {
            script: series(
                run('./commands/tsconfig.ts')
            ),
            hiddenFromHelp: true
        },
        /**
         * Builds the app into the dist directory
         */
        build: {
            script: series(
                'nps banner.build',
                'nps config',
                'nps lint',
                'nps clean.dist',
                'nps transpile',
                'nps copy'
            ),
            description: 'Builds the app into the dist directory'
        },
        /**
         * Runs TSLint over your project
         */
        lint: {
            script: tslint(`./src/**/*.ts`),
            hiddenFromHelp: true
        },
        /**
         * Transpile your app into javascript
         */
        transpile: {
            script: `tsc --project ./tsconfig.build.json`,
            hiddenFromHelp: true
        },
        /**
         * Clean files and folders
         */
        clean: {
            default: {
                script: series(
                    `nps banner.clean`,
                    `nps clean.dist`
                ),
                description: 'Deletes the ./dist folder'
            },
            dist: {
                script: rimraf('./dist'),
                hiddenFromHelp: true
            }
        },
        /**
         * Copies static files to the build folder
         */
        copy: {
            default: {
                script: series(
                    `nps copy.swagger`
                ),
                hiddenFromHelp: true
            },
            swagger: {
                script: copy(
                    './src/api/swagger.json',
                    './dist'
                ),
                hiddenFromHelp: true
            }
        },
        /**
         * These run various kinds of tests. Default is unit.
         */
        test: {
            default: 'nps test.unit',
            unit: {
                default: {
                    script: series(
                        'nps banner.testUnit',
                        'nps test.unit.pretest',
                        'nps test.unit.run'
                    ),
                    description: 'Runs the unit tests'
                },
                pretest: {
                    script: tslint(`./test/unit/**.ts`),
                    hiddenFromHelp: true
                },
                run: {
                    script: 'set NODE_ENV=test&& jest --testPathPattern=unit',
                    hiddenFromHelp: true
                },
                verbose: {
                    script: 'nps "test --verbose"',
                    hiddenFromHelp: true
                },
                coverage: {
                    script: 'nps "test --coverage"',
                    hiddenFromHelp: true
                }
            }
        },
        /**
         * This creates pretty banner to the terminal
         */
        banner: {
            build: banner('build'),
            serve: banner('serve'),
            testUnit: banner('test.unit'),
            clean: banner('clean')
        }
    }
};

function banner(name) {
    return {
        hiddenFromHelp: true,
        silent: true,
        description: `Shows ${name} banners to the console`,
        script: run(`./commands/banner.ts ${name}`),
    };
}

function copy(source, target) {
    return `copyup ${source} ${target}`;
}

function run(path) {
    return `ts-node ${path}`;
}

function tslint(path) {
    return `tslint -c ./tslint.json ${path} --format stylish`;
}
