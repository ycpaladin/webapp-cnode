import React,{Component} from 'react';

export default class NoItems extends Component{

    render(){
        return (
            <tr>
                <td colSpan="4">
                    没有找到数据!
                </td>
            </tr>
        )
    }
}