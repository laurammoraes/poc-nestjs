import { Inject } from '@nestjs/common'
import { NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from 'src/database/schemas/schema'

// const { DRIZZLE_CONNECTION, DRIZZLE_READ_CONNECTION, PG_CONNECTION } = Constants

// export default class BaseRepository<T> {
// 	constructor(
// 		@Inject(DRIZZLE_CONNECTION) public pg: NodePgDatabase<typeof schema>,
// 		@Inject(DRIZZLE_READ_CONNECTION) public pgRead: NodePgDatabase<typeof schema>,
// 		@Inject(PG_CONNECTION) private connection: Pool
// 	) {
// 		//
// 	}

// 	async disconnect() {
// 		return this.connection.end()
// 	}
// }