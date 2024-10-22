import { db } from "@/app/appwrite";
import { ID, type Models, Query } from "appwrite";
import { type DevstinationDTO, type Devstination, type EvilDevs, type Technology } from "@/types";
import { envServer } from "@/env/serverEnv";
import { COLLECTIONS_ID } from "@/enums"

class BaseRepository<DocumentType extends object, DocumentDTO extends Models.Document = (Models.Document & DocumentType)> {
  private dbId:string = envServer.APPWRITE_DB_ID
  private db = db
  
  constructor(private collectionId: string) {}

  async getAll(query?: string[]) {
    const { documents } = await this.db.listDocuments<DocumentDTO>(this.dbId, this.collectionId, query)
    return documents
  }

  async getOne(id: string, query?: string[]) {
    const document = await this.db.getDocument<DocumentDTO>(this.dbId, this.collectionId, id, query)
    return document
  }

  async create(data: DocumentType) {
    const { $id } = await this.db.createDocument(this.dbId, this.collectionId, ID.unique(), data)
    return $id
  }

  async update(id: string, data: Partial<DocumentType>):Promise<void> {
    await this.db.updateDocument(this.dbId, this.collectionId, id, data)
  }
}

class DevstinationRepository extends BaseRepository<Devstination, DevstinationDTO> {
  constructor(collectionId: string) {
    super(collectionId)
  }

  getBySlug(slug: string) {
    return this.getAll([Query.equal("slug", slug)])
  }
}

export const evilDevsRepository = new BaseRepository<EvilDevs>(COLLECTIONS_ID.EVIL_DEVS)

export const technologiesRepository = new BaseRepository<Technology>(COLLECTIONS_ID.TECHNOLOGIES)

export const devstinationRepository = new DevstinationRepository(COLLECTIONS_ID.DESTINATIONS)