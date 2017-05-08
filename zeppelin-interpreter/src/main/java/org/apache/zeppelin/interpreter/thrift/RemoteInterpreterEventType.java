/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Autogenerated by Thrift Compiler (0.9.2)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
package org.apache.zeppelin.interpreter.thrift;


import java.util.Map;
import java.util.HashMap;
import org.apache.thrift.TEnum;

public enum RemoteInterpreterEventType implements org.apache.thrift.TEnum {
  NO_OP(1),
  ANGULAR_OBJECT_ADD(2),
  ANGULAR_OBJECT_UPDATE(3),
  ANGULAR_OBJECT_REMOVE(4),
  RUN_INTERPRETER_CONTEXT_RUNNER(5),
  RESOURCE_POOL_GET_ALL(6),
  RESOURCE_GET(7),
  OUTPUT_APPEND(8),
  OUTPUT_UPDATE(9),
  OUTPUT_UPDATE_ALL(10),
  ANGULAR_REGISTRY_PUSH(11),
  APP_STATUS_UPDATE(12),
  META_INFOS(13),
  REMOTE_ZEPPELIN_SERVER_RESOURCE(14);

  private final int value;

  private RemoteInterpreterEventType(int value) {
    this.value = value;
  }

  /**
   * Get the integer value of this enum value, as defined in the Thrift IDL.
   */
  public int getValue() {
    return value;
  }

  /**
   * Find a the enum type by its integer value, as defined in the Thrift IDL.
   * @return null if the value is not found.
   */
  public static RemoteInterpreterEventType findByValue(int value) { 
    switch (value) {
      case 1:
        return NO_OP;
      case 2:
        return ANGULAR_OBJECT_ADD;
      case 3:
        return ANGULAR_OBJECT_UPDATE;
      case 4:
        return ANGULAR_OBJECT_REMOVE;
      case 5:
        return RUN_INTERPRETER_CONTEXT_RUNNER;
      case 6:
        return RESOURCE_POOL_GET_ALL;
      case 7:
        return RESOURCE_GET;
      case 8:
        return OUTPUT_APPEND;
      case 9:
        return OUTPUT_UPDATE;
      case 10:
        return OUTPUT_UPDATE_ALL;
      case 11:
        return ANGULAR_REGISTRY_PUSH;
      case 12:
        return APP_STATUS_UPDATE;
      case 13:
        return META_INFOS;
      case 14:
        return REMOTE_ZEPPELIN_SERVER_RESOURCE;
      default:
        return null;
    }
  }
}
