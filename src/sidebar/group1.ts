import * as vscode from 'vscode';

// 树节点
export class EntryItem extends vscode.TreeItem
{
}

//树的内容组织管理
export class EntryList implements vscode.TreeDataProvider<EntryItem>
{
    private _command:{ label: string; command: string; }[] = [
        {
            "label": "config build watch",
            "command": "cd ../my_h5_env/raw_resources/config && 命令-转换所有csv-监视模式.bat",
        }
    ]
    onDidChangeTreeData?: vscode.Event<void | EntryItem | null | undefined> | undefined;
    getTreeItem(element: EntryItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: EntryItem): vscode.ProviderResult<EntryItem[]> {
        if (element) {//子节点
            var childs = [];
            for (let i = 0; i < this._command.length; i++) {
                let str = this._command[i].label;
                var item = new EntryItem(str,vscode.TreeItemCollapsibleState.None);
                item.command = {command:"sidebar_group1.openChild", //命令id
                                title:this._command[i].label,
                                arguments:[this._command[i].label,this._command[i].command] //命令接收的参数
								};
                childs[i] = item;
            }
            return childs;
        } else { //根节点
            return [new EntryItem("root",vscode.TreeItemCollapsibleState.Collapsed)];
        }
    }
}