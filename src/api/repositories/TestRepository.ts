import { env } from '../../core/index';
import { Component } from '@nestjs/common';
import { LogService } from '../../core/index';

import * as couchbase from 'couchbase';

@Component()
export class TestRepository {

    constructor(private readonly logService: LogService) {
    }

    public test(): string {
        const cluster: any = new couchbase.Cluster(env.db.connection);
        cluster.authenticate(env.db.username, env.db.password);
        const bucket = cluster.openBucket('user');
        const n1qlQuery = couchbase.N1qlQuery;

        this.logService.info('About', bucket);

        bucket.manager().createPrimaryIndex(() => {
            bucket.upsert('user:king_arthur', {
                email: 'kingarthur@couchbase.com',
                interests: ['Holy Grail', 'African Swallows'],
            }, (err1, result1) => {
                bucket.get('user:king_arthur', (err2, result2) => {
                    console.log('Got result: %j', result2.value);
                    bucket.query(
                        n1qlQuery.fromString('SELECT * FROM `user` WHERE $1 in interests LIMIT 1'), ['African Swallows'],
                        (err3, rows3) => {
                            console.log('Got rows: %j', rows3);
                        });
                });
            });
        });
        return 'logService';
    }
}
