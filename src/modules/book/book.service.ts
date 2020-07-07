import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { UserRepository } from '../user/user.repository';
import { ReadBookDto } from './dtos/read-book.dto';
import { plainToClass } from 'class-transformer';
import { Book } from './book.entity';
import { In } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { User } from '../user/user.entity';
import { Role } from '../role/role.entity';
import { RoleType } from '../role/roletype.enum';
import { UpdateBookDto } from './dtos/update-book.dto';
import { ReadUserDto } from '../user/dto/read-user.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly _bookRepository: BookRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async get(bookId: number): Promise<ReadBookDto> {
    if (!bookId) {
      throw new BadRequestException('userId debe ser enviado');
    }

    const book: Book = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!book) {
      throw new NotFoundException('El libro no existe');
    }
    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const books: Book[] = await this._bookRepository.find({
      where: { status: 'ACTIVE' },
    });
    return books.map(book => plainToClass(ReadBookDto, book));
  }

  async getBoookByAuthor(authorId: number): Promise<ReadBookDto[]> {
    if (!authorId) {
      throw new BadRequestException('El id deberia ser enviado');
    }
    const books: Book[] = await this._bookRepository.find({
      // where: { status: 'ACTIVE', authors: In([authorId]) },
      where: { status: 'ACTIVE' },
    });
    return books.map(book => plainToClass(ReadBookDto, book));
  }

  async create(book: Partial<CreateBookDto>): Promise<ReadBookDto> {
    const authors: User[] = [];

    for (const authorId of book.authors) {
      const authorExists = await this._userRepository.findOne(authorId, {
        where: { status: 'ACTIVE' },
      });

      if (!authorExists) {
        throw new NotFoundException(
          `No existe un autor con este Id:${authorId}`,
        );
      }

      const isAuthor = authorExists.roles.some(
        (role: Role) => role.name === RoleType.AUTHOR,
      );

      if (!isAuthor) {
        throw new UnauthorizedException(
          `El usuario ${authorId} no es un autor`,
        );
      }
      authors.push(authorExists);
    }

    const saveBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      authors,
    });
    return plainToClass(ReadBookDto, saveBook);
  }

  async createByAuthor(book: Partial<CreateBookDto>, authorId: number) {
    const author = await this._userRepository.findOne(authorId, {
      where: { status: 'ACTIVE' },
    });

    const isAuthor = author.roles.some(
      (role: Role) => role.name === RoleType.AUTHOR,
    );

    if (!isAuthor) {
      throw new UnauthorizedException(
        `Este usuario ${authorId} no es un autor`,
      );
    }

    const saveBook: Book = await this._bookRepository.save({
      name: book.name,
      description: book.description,
      author,
    });
    return plainToClass(ReadBookDto, saveBook);
  }

  async update(
    bookId: number,
    book: Partial<UpdateBookDto>,
    authorId: number,
  ): Promise<ReadBookDto> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new NotFoundException('Este libro no existe');
    }
    const isOwnBook = bookExists.authors.some(author => author.id === authorId);

    if (!isOwnBook) {
      throw new UnauthorizedException(
        'Este usuario no es el autor de este libro',
      );
    }

    const updateBook = await this._bookRepository.update(bookId, book);
    return plainToClass(ReadBookDto, updateBook);
  }

  async delete(bookId: number): Promise<void> {
    const bookExists = await this._bookRepository.findOne(bookId, {
      where: { status: 'ACTIVE' },
    });

    if (!bookExists) {
      throw new NotFoundException('Este libro no existe');
    }
    await this._bookRepository.update(bookId, { status: 'INACTIVE' });
  }
}
