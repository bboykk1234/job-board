import { Client } from "@elastic/elasticsearch"

const ElasticsearchClient = new Client({ node: process.env.ES_NODE });

export default ElasticsearchClient;