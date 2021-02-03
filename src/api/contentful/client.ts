import {
  ContentfulClientApi,
  EntryCollection,
  SyncCollection,
} from "contentful"
import { ContentfulResource } from "App/api/contentful/contentful-resource.enum"
import axios, { AxiosInstance } from "axios"

export class Client
  implements Pick<ContentfulClientApi, "getEntries" | "sync"> {
  resource: ContentfulResource
  private client: AxiosInstance
  constructor(config: { resource: ContentfulResource }) {
    this.resource = config.resource
    this.client = axios.create({
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
      },
    })
  }

  async getEntries<Entry>(query: {
    content_type: string
    limit?: number
  }): Promise<EntryCollection<Entry>> {
    if (!query.content_type) {
      throw new Error("Empty query content type")
    }
    if (this.resource !== ContentfulResource.News) {
      throw new Error("Wrong resource provided")
    }
    try {
      const { data } = await this.client.post(
        process.env.CONTENTFUL_LAMBDA as string,
        JSON.stringify({
          resource: this.resource,
          method: "getEntries",
          query,
        })
      )
      return data
    } catch (e) {
      throw new Error(e)
    }
  }

  async sync(query: Record<string, any>): Promise<SyncCollection> {
    if (this.resource !== ContentfulResource.Help) {
      throw new Error("Wrong resource provided")
    }
    try {
      const { data } = await this.client.post(
        process.env.CONTENTFUL_LAMBDA as string,
        JSON.stringify({
          resource: this.resource,
          method: "sync",
          query,
        })
      )
      return data
    } catch (e) {
      throw new Error(e)
    }
  }
}
