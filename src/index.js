#!/usr/bin/env node

// demo 1
// 输出版本信息

const pkg = require('../package.json')
const command = process.argv[2]
switch (command) {
    case '-v':
        console.log(pkg.version)
        break
    case '-h':
        console.log('creatcli -v 当前版本号')
        console.log('creatcli -h 帮助文档')
        console.log('creatcli init 创建项目')
        break
    default:     
        break
}


const program = require('commander')
const inquire = require('inquirer')
const shell = require('shelljs')

const initAction = () => {
     inquire.prompt([{
        type:'list',
        message:'请选择你要创建的项目模版',
        name: 'type',
        choices: [
        'Web',
        'Screen',
        'Mobile'
        ],
     }]).then(answer => { 
         console.log('answer type', answer.type)
         const typeEnum = {
             Web:{name:'web-template',url:'git@codeup.aliyun.com:micro_data/frontend/web-template.git'},
             Screen:{name:'DataTemplate',url:'git@codeup.aliyun.com:micro_data/frontend/DataTemplate.git'},
             Mobile:{name:'',url:''},
         }
            inquire.prompt([{
                type:'input',
                message:'请输入项目名称',
                name: 'name'
            }]).then(result=>{
            console.log('正在拷贝',`${answer.type}项目`)
            const remote = typeEnum[answer.type].url
            const curName = typeEnum[answer.type].name
            const tarName = result.name
            shell.exec(`git clone ${remote}
            mv ${curName} ${tarName}
            rm -rf ./${tarName}/.git
            cd ${tarName}
            `, (error, stdout, stderr) => {
                if(error){
                    console.error(`EXEC ERROR${error}`)
                }
            })     
        })
     })
    
}
program
.command('init')
.description('创建项目')
.action(initAction)
program.parse(process.argv)


