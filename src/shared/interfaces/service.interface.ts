export interface IService<T> {
    fetchByParam<K>(httpParam: K): Promise<T>;
    fetchBulkByParam<K>(httpParam: K): Promise<Array<T>>;
    create<K>(httpBody: K): Promise<void>;
    updateByParam<K, V>(httpParam: K, httpBody: V): Promise<void>;
    deleteByParam<K, V>(httpParam: K): Promise<void>;
}