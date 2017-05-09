/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular.module('zeppelinWebApp').service('noteActionSrv', noteActionSrv);

noteActionSrv.$inject = ['websocketMsgSrv', '$location', 'renameSrv', 'noteListDataFactory'];

function noteActionSrv(websocketMsgSrv, $location, renameSrv, noteListDataFactory) {
  this.moveNoteToTrash = function(noteId, redirectToHome) {
    BootstrapDialog.confirm({
      closable: true,
      title: '将该笔记移入回收站?',
      message: '该笔记将会被移入 <strong>回收站</strong>.',
      callback: function(result) {
        if (result) {
          websocketMsgSrv.moveNoteToTrash(noteId);
          if (redirectToHome) {
            $location.path('/');
          }
        }
      }
    });
  };

  this.moveFolderToTrash = function(folderId) {
    BootstrapDialog.confirm({
      closable: true,
      title: '将该目录移入回收站?',
      message: '该目录竟会被移入 <strong>回收站</strong>.',
      callback: function(result) {
        if (result) {
          websocketMsgSrv.moveFolderToTrash(folderId);
        }
      }
    });
  };

  this.removeNote = function(noteId, redirectToHome) {
    BootstrapDialog.confirm({
      type: BootstrapDialog.TYPE_WARNING,
      closable: true,
      title: '警告! 该笔记将会被永久删除',
      message: '这无法撤销，确定吗?',
      callback: function(result) {
        if (result) {
          websocketMsgSrv.deleteNote(noteId);
          if (redirectToHome) {
            $location.path('/');
          }
        }
      }
    });
  };

  this.removeFolder = function(folderId) {
    BootstrapDialog.confirm({
      type: BootstrapDialog.TYPE_WARNING,
      closable: true,
      title: '警告! 该文件夹将会被永久删除',
      message: '这无法撤销，确定吗?',
      callback: function(result) {
        if (result) {
          websocketMsgSrv.removeFolder(folderId);
        }
      }
    });
  };

  this.restoreAll = function() {
    BootstrapDialog.confirm({
      closable: true,
      title: '确认恢复回收站中的所有笔记吗?',
      message: '回收站中的文件夹与笔记将会 ' +
      '<strong>合并</strong> 到他们原来的地方.',
      callback: function(result) {
        if (result) {
          websocketMsgSrv.restoreAll();
        }
      }
    });
  };

  this.emptyTrash = function() {
    BootstrapDialog.confirm({
      type: BootstrapDialog.TYPE_WARNING,
      closable: true,
      title: '警告! 回收站里的笔记将会被永久删除',
      message: '这将无法撤销，确定吗？',
      callback: function(result) {
        if (result) {
          websocketMsgSrv.emptyTrash();
        }
      }
    });
  };

  this.clearAllParagraphOutput = function(noteId) {
    BootstrapDialog.confirm({
      closable: true,
      title: '',
      message: '需要清除所有输出吗?',
      callback: function(result) {
        if (result) {
          websocketMsgSrv.clearAllParagraphOutput(noteId);
        }
      }
    });
  };

  this.renameNote = function(noteId, notePath) {
    renameSrv.openRenameModal({
      title: '重命名笔记',
      oldName: notePath,
      callback: function(newName) {
        websocketMsgSrv.renameNote(noteId, newName);
      }
    });
  };

  this.renameFolder = function(folderId) {
    renameSrv.openRenameModal({
      title: '重命名文件夹',
      oldName: folderId,
      callback: function(newName) {
        var newFolderId = normalizeFolderId(newName);
        if (_.has(noteListDataFactory.flatFolderMap, newFolderId)) {
          BootstrapDialog.confirm({
            type: BootstrapDialog.TYPE_WARNING,
            closable: true,
            title: '警告! 该文件夹将会被合并',
            message: 'The folder will be merged into <strong>' + newFolderId + '</strong>. Are you sure?',
            callback: function(result) {
              if (result) {
                websocketMsgSrv.renameFolder(folderId, newFolderId);
              }
            }
          });
        } else {
          websocketMsgSrv.renameFolder(folderId, newFolderId);
        }
      }
    });
  };

  function normalizeFolderId(folderId) {
    folderId = folderId.trim();

    while (folderId.indexOf('\\') > -1) {
      folderId = folderId.replace('\\', '/');
    }

    while (folderId.indexOf('///') > -1) {
      folderId = folderId.replace('///', '/');
    }

    folderId = folderId.replace('//', '/');

    if (folderId === '/') {
      return '/';
    }

    if (folderId[0] === '/') {
      folderId = folderId.substring(1);
    }

    if (folderId.slice(-1) === '/') {
      folderId = folderId.slice(0, -1);
    }

    return folderId;
  }
}
