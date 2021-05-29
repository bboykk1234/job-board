import Skill from "../models/Skill";
import ElasticsearchClient from "../services/ElasticsearchClient";

export default class SkillEsRepository {
    static indexName = "skills"

    static async createBulk(skills: Skill[]) {
        const body = skills.flatMap(skill => [{
            index: { _index: this.indexName, _type: "_doc", _id: skill.id }
        },
        { name: skill.name.toLowerCase() }
        ])

        return ElasticsearchClient.bulk({ body })
    }

    static async search(query: string): Promise<string[]> {
        return new Promise(async (resolve) => {
            const esRes = await ElasticsearchClient.search({
                index: this.indexName,
                type: "_doc",
                body: {
                    query: {
                        match: {
                            name: {
                                query,
                                operator: "and"
                            }
                        }
                    }
                }
            })

            console.log(esRes.body.hits.hits)
            const hits = esRes.body.hits.hits || []
            if (hits.length === 0) {
                resolve([])
            }

            resolve(hits.map((hit: { _id: string }) => hit._id))

        })
    }
}