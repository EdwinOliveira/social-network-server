import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IService } from 'src/shared/interfaces/service.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';

@Injectable()
export class AuthenticationService implements IService<UserEntity> {
    public constructor(@InjectRepository(UserEntity) private readonly _userEntityRepository: Repository<UserEntity>) { }

    public async fetchByParam<K>(httpParam: K): Promise<UserEntity> {
        return await this._userEntityRepository.findOne(httpParam).catch((error) => {
            throw error;
        });
    }

    public async fetchBulkByParam<K>(httpParam: K): Promise<UserEntity[]> {
        return await this._userEntityRepository.find(httpParam).catch((error) => {
            throw error;
        });
    }

    public async create<K>(httpBody: K): Promise<void> {
        await this._userEntityRepository.save(httpBody).catch((error) => {
            throw error;
        });
    }

    public async updateByParam<K, V>(httpParam: K, httpBody: V): Promise<void> {
        await this._userEntityRepository.update(httpParam, httpBody).catch((error) => {
            throw error;
        });
    }

    public async deleteByParam<K, V>(httpParam: K): Promise<void> {
        await this._userEntityRepository.delete(httpParam).catch((error) => {
            throw error;
        });
    }
}
