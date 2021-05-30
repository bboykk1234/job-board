import { Client } from "@elastic/elasticsearch"
import "dotenv/config"

const [action] = process.argv.slice(2);

const client = new Client({ node: process.env.ES_NODE });

async function createIndex() {
    const jobIndexExistsRes = await client.indices.exists({ index: "jobs" })

    if (!jobIndexExistsRes.body) {
        try {
            const jobIndexCreateRes = await client.indices.create({
                index: "jobs",
                include_type_name: true,
                body: {
                    settings: {
                        number_of_shards: 1
                    },
                    mappings: {
                        _doc: {
                            dynamic: "strict",
                            properties: {
                                employment_type_id: {
                                    type: "long"
                                },
                                level_id: {
                                    type: "long"
                                },
                                job_function_id: {
                                    type: "long"
                                },
                                company_id: {
                                    type: "long"
                                },
                                skill_ids: {
                                    type: "long"
                                },
                                keywords: {
                                    type: "text",
                                    analyzer: "standard"
                                },
                                closed_at: {
                                    type: "date",
                                    null_value: "1970-01-01T00:00:00Z",
                                }
                            }
                        }
                    }
                }
            })

            console.log(jobIndexCreateRes)
        } catch (err) {
            console.log(err.meta.body.error)
            console.log(err.meta.meta.request)
            throw err
        }
    }

    const jobAppIndexExistsRes = await client.indices.exists({ index: "job_applications" })

    if (!jobAppIndexExistsRes.body) {
        const jobAppIndexCreateRes = await client.indices.create({
            index: "job_applications",
            include_type_name: true,
            body: {
                settings: {
                    number_of_shards: 1
                },
                mappings: {
                    _doc: {
                        dynamic: "strict",
                        properties: {
                            job_id: {
                                type: "long"
                            },
                            keywords: {
                                type: "text",
                                analyzer: "standard"
                            },
                        }
                    }
                }
            }
        })

        console.log(jobAppIndexCreateRes)
    }

    const skillIndexExistsRes = await client.indices.exists({ index: "skills" })

    if (!skillIndexExistsRes.body) {
        const skillIndexCreateRes = await client.indices.create({
            index: "skills",
            include_type_name: true,
            body: {
                settings: {
                    number_of_shards: 1,
                    max_ngram_diff: 30,
                    analysis: {
                        analyzer: {
                            autocomplete: {
                                tokenizer: "autocomplete"
                            },
                            autocomplete_search: {
                                tokenizer: "lowercase"
                            }
                        },
                        tokenizer: {
                            autocomplete: {
                                type: "ngram",
                                min_gram: 1,
                                max_gram: 30,
                                token_chars: [
                                    "letter",
                                    "digit"
                                ]
                            }
                        }
                    }
                },
                mappings: {
                    _doc: {
                        dynamic: "strict",
                        properties: {
                            name: {
                                type: "text",
                                analyzer: "autocomplete",
                                search_analyzer: "autocomplete_search",
                                fields: {
                                    raw: {
                                        type: "keyword"
                                    }
                                }
                            },
                        }
                    }
                }
            }
        })

        console.log(skillIndexCreateRes)
    }
}

async function dropIndices() {
    const jobIndexExistsRes = await client.indices.exists({ index: "jobs" })
    console.log(jobIndexExistsRes)
    if (jobIndexExistsRes.body) {
        const deleteJobIndexRes = await client.indices.delete({ index: "jobs" })
        console.log(deleteJobIndexRes);
    }

    const jobAppIndexExistsRes = await client.indices.exists({ index: "job_applications" })

    if (jobAppIndexExistsRes.body) {
        const deleteJobAppIndexRes = await client.indices.delete({ index: "job_applications" })
        console.log(deleteJobAppIndexRes);
    }

    const skillIndexExistsRes = await client.indices.exists({ index: "skills" })

    if (skillIndexExistsRes.body) {
        const deleteSkillIndexRes = await client.indices.delete({ index: "skills" })
        console.log(deleteSkillIndexRes);
    }
}

if (!action) {
    console.log("Missing action");
    process.exit();
}

if (action == "indices:up") {
    createIndex().then(() => {
        process.exit()
    })
}

if (action == "indices:drop") {
    dropIndices().then(() => {
        process.exit()
    })
}