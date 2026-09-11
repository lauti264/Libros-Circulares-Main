import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEditionDto } from './dto/create-edition.dto';
import { UpdateEditionDto } from './dto/update-edition.dto';
import { Edition } from './entities/edition.entity';
import { PublisherService } from '../publisher/publisher.service';
import { BookService } from '../book/book.service';
@Injectable()
export class EditionService {
  constructor(private readonly publisherService: PublisherService, private readonly bookService: BookService){}
  static editions: Edition [] = [];
  create(createEditionDto: CreateEditionDto) {
  const book = this.bookService.findOne(createEditionDto.bookId)
  const publisher = this.publisherService.findOne(createEditionDto.publisherId)
  const newEdition = new Edition()
  newEdition.year = createEditionDto.year
  newEdition.id = Math.random()
  newEdition.book = book
  newEdition.publisher = publisher
  EditionService.editions.push(newEdition)
}

  findAll() {
    return EditionService.editions
  }

  findOne(id: number) {
    const edition = EditionService.editions.find(e =>e.id == id)
      if(!edition){
        throw new NotFoundException()
      }
      return edition
  }

  update(id: number, updateEditionDto: UpdateEditionDto) {
    return `This action updates a #${id} edition`;
  }

  remove(id: number) {
    return `This action removes a #${id} edition`;
  }
}
