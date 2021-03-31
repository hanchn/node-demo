#!/usr/bin/env node

import shell from 'shelljs' // 用于在nodejs中使用shell
import chalk from 'chalk' // 用于改变cmd文字颜色
import { program } from 'commander'
import download from 'download-git-repo'
import fs from 'fs'
const { version } = JSON.parse(fs.readFileSync('./package.json'))
const remote = 'git@codeup.aliyun.com:cupshe/webFrontEnd/npm/basicPlatform.git';  
const branch = 'master';
const option = { clone: true }

shell.echo('请选择你要安装的cupshe-node版本：')
console.log(chalk.green(`♪(＾∀＾●)ﾉ，你的shell命令成功运行了！ `))
program.version(version,'-v,-V,--version', '查看版本号')  
program.command('init <name>') 
    .description('创建项目') 
    .action((name, option) => {
        console.log('name ', name)
        console.log('option ', option)
        // 0. 检查控制台是否可以运行`git `，
        if (!shell.which('git')) { // 检测是否有git命令
            console.log(symbols.error, '对不起，git命令不可用！');
            shell.exit(1);
        }
    return    
    download(
      remote: `direct:${remote}#${branch}`, 
      name, 
      option, 
      err => console.log('err', err))
    });
program.parse(process.argv);
