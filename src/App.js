import React from 'react';
import './App.css';

//自定义表格列名
const columns = [{
	title: 'ID',
	key: 'ID',
},
{
	title: '名称',
	key: 'name',
},
{
	title: '数量',
	key: 'num',
},
{
	title: '单价',
	key: 'unitPrice',
}
]
//自定义表格数据（所有表格个共用数据）
const data = [{
		name: 'iphone12',
		num: 2,
		unitPrice: 59.9
	},
	{
		name: 'iphone12Max ',
		num: 1,
		unitPrice: 378.0
	},
	{
		name: 'iphone12MaxPro',
		num: 3,
		unitPrice: 63.0
	},
	{
		name: '华为Mate40',
		num: 3,
		unitPrice: 60.0
	},
	{
		name: '华为Mate40 Pro',
		num: 3,
		unitPrice: 93.0
	}
]
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tabledata: [],	//初始化后的所有表格数据
			tablecount: 2	//表格个数
		}
	}
	createArr = (num) => {
		var arr = []
		for(let i = 0; i < num; i++) {
			arr.push({})
		}
		return arr
	}
	//初始化表格数据（生成表格）
	initdata = () => {
		var arr = []
		for (var i = 0; i < this.state.tablecount * 1; i++) {
			var obj = {		//初始化每个表格数据
				data: data,		//表格数据
				rowcount: 2,	//表格显示行数
				page: this.createArr(Math.ceil(data.length / 2)),	//页码
				current: 1		//当前选中行数
			}
			arr.push(obj)
		}
		
		this.setState({
			tabledata: arr
		})
	}
	//控制生成的表格数量
	inputNumChange = (e) => {
		this.setState({
			tablecount: e.target.value
		})
	}
	//表格页码跳转
	changecurrent(curr, id) {
		const data = JSON.parse(JSON.stringify(this.state.tabledata))
		data.forEach((item, index) => {
			if (id === index) {
				item.current = curr;
			}
		})
		this.setState({
			tabledata: data
		})
	}
	//控制表格行数的显示
	sencepage = (e, id) => {
		const data = JSON.parse(JSON.stringify(this.state.tabledata))
		data.forEach((item, index) => {
			if (id === index) {
				this.initdata()
				item.rowcount = e.target.value
				item.page = this.createArr(Math.ceil(item.data.length / parseInt(e.target.value)))
			}
		})
		this.setState({
			tabledata: data
		})
	}
	//渲染
	render() {
		const {tabledata} = this.state
		return (
			<div>
				<div className="tablemange">
					<span>表格数量：</span><input type="text" onChange={(e) => this.inputNumChange(e)}></input>
					<input type="button" value="生成表格" onClick={this.initdata}></input>
				</div>
				{
					tabledata.map((tb, tbindex) => {
						return (
							<div className="mytable" key={tbindex}>
								<table className="table table-bordered table-striped text-center">
									<thead>
										<tr>
											{
												columns.map((item, i) => {
													return <th key={i}>{item.key}</th>
												})
											}
										</tr>
									</thead>
									<tbody>
										{
											tb.data && tb.data.map((item, index) => {
												if (index >= tb.rowcount * (tb.current - 1) && index < tb.rowcount * tb.current) {
													return (
														<tr key={index}>
															<td>{index+1}</td>
															<td>{item.name}</td>
															<td>{item.num}</td>
															<td>{item.unitPrice}</td>
														</tr>
													)
												} else {
													return false
												}
											})
										}
									</tbody>
								</table>
								{/* 分页 */}
								<div className="pagepostion">
									<input type="text" onChange={(e) => this.sencepage(e, tbindex)} value={tb.rowcount}></input>
									<ul className="pagesize">
										{
											tb.page && tb.page.map((item, index) => {
												return <li key={index} onClick={() => this.changecurrent(index+1,tbindex)}>{index+1}</li>
											})
										}
									</ul>
								</div>
							</div>
						)
					})
				}
			</div>
			
		)
	}
}

export default App;
