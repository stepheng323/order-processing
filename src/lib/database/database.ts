import { Model } from 'objection';
import Knex from 'knex';
import * as dbCredentials from '../../../knexfile';

const knex = Knex(dbCredentials);

Model.knex(knex);

export default knex;
