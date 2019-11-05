/**
 * redis 工具类
 */
import Redis from "ioredis";
import {
  DB
} from '../config';
class RedisDBTool {
  constructor() {
    this.redis = new Redis(DB.redisConf);
  }
  /**
   * 查询
   * @param key 键
   * @return
   */
  async findByKey(key) {
    return await this.redis.get(key)
  }
  /**
   * save
   * @param key 键
   * @param val 值
   * @param expire (过期时间,单位秒;可为空，为空表示不过期)
   */
  async save(key, val, expire) {
    if (!isNaN(expire) & expire > 0) {
      this.redis.set(key, val, 'EX', parseInt(expire))
    } else {
      this.redis.set(key, val)
    }

  }
  /**
   * delete
   * @param key
   */
  async delete(key) {
      this.redis.del(key)
  }

  /**
   * 清空所有缓存
   */
  flushdb() {

  }

}
module.exports = new RedisDBTool();