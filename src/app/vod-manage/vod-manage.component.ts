import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TokensService} from "../tokens.service";
import {APIResult, APIResultVODFileList} from "../APIResults/APIResults";
import {environment} from "../../environments/environment";
import {NestedTreeControl} from "@angular/cdk/tree";
import {MatTreeNestedDataSource} from "@angular/material";
import {of} from "rxjs/internal/observable/of";

class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
  size: number;

  constructor(filename, type, size) {
    this.filename = filename;
    this.type = type;
    this.size = size;
    this.children = [];
  }

  add_child(node: FileNode) {
    this.children.push(node);
  }

  add_child_from_json(filename, type, size) {
    if (filename.indexOf('/') >= 0) {
      let root = filename.slice(0, filename.indexOf('/'));
      let file_remaining =filename.slice(filename.indexOf('/') + 1, filename.length);

      let root_node = undefined;
      for (let child in this.children) {
        if (this.children[child].filename === root) {
          root_node = this.children[child];
          continue;
        }
      }
      if (root_node === undefined) {
        root_node = new FileNode(root, 'dir', undefined);
        this.add_child(root_node);
      }
      root_node.add_child_from_json(file_remaining, type, size);
    } else {
      this.add_child(new FileNode(filename, type, size));
    }
  }

}

@Component({
  selector: 'app-vod-manage',
  templateUrl: './vod-manage.component.html',
  styleUrls: ['./vod-manage.component.css']
})
export class VodManageComponent implements OnInit {
  treeControl: NestedTreeControl<FileNode>;
  treeData: MatTreeNestedDataSource<FileNode>;

  error_text = undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokensService
  ) {
    this.treeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.treeData = new MatTreeNestedDataSource();
  }

  hasNestedChild = (_: number, nodeData: FileNode) => nodeData.type === 'dir';
  private _getChildren = (node: FileNode) => of(node.children);

  ngOnInit() {
    if (this.tokenService.refreshToken == undefined) {
      this.router.navigate(['/index']);
      return;
    }

    if (this.tokenService.authToken != undefined)
      this.refreshUI();
    this.tokenService.newAuthToken.subscribe(isValid => {
      if (isValid) {
        this.refreshUI();
      } else {
        this.resetUI();
      }
    });
  }

  resetUI() {
    this.treeData.data = [];
  }

  refreshUI() {
    let options = {
      params: {data: JSON.stringify({})},
      headers: this.tokenService.getAuthTokenHeader().headers
    };
    this.http.get<APIResult>(environment.baseUrl + '/api/vod/file/list', options ).subscribe(json => {
      if (json.success === 'yes') {
        this.error_text = undefined;
        let result = <APIResultVODFileList> json.payload;
        this.treeData.data = this.build_tree(result);
      } else {
        this.error_text = json.error;
      }
    });
  }

  build_tree(json_data: APIResultVODFileList) {
    let node_root = new FileNode('/', 'dir', 0);
    for (let entry in json_data.vod) {
      let file = json_data.vod[entry];
      node_root.add_child_from_json(file.filename, file.type, file.size);
    }
    return node_root.children;
  }

}
