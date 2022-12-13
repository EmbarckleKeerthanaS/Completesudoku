import React from 'react'
import './Styles.css'
import { useState } from 'react'
import 'react-notifications-component/dist/theme.css';
import { Store } from 'react-notifications-component';


export const CompleteSudoku = () => {

            var sudoku = [
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0,
                0,0,0,0,0,0,0,0,0
            ]

           var board = new Array(81)
            
            getBoard(sudoku)
            board = [...sudoku]
            
            function getBoard(sudoku){
                fillsudoku(sudoku)
                removeElements(sudoku)
                for(let n=0;n<81;n++){
                    if(sudoku[n] === 0){
                        sudoku[n]=''
                    }
                    
                }
                
            }

            
           
            
            const [myInput,setMyInput]=useState(board)
            
            const [cellState,setCellState] = useState(false)

            // var resultarr = [];
            var count = 0;
    

        function checkNoOfSolution(sudoku){
            var arr=[];
            
            for(let firstindex=0;firstindex<81;firstindex++)
            {
                if(sudoku[firstindex] === 0)
                {

                    for(let no = 1;no<=9;no++){
                        if(checkRow(firstindex,no) && checkBox(firstindex,no) && columnCheck(firstindex,no)){
                            arr.push(no)
                        }
                    }

                    // console.log(arr)

                    for(let k = 0;k<arr.length;k++){
                        if(checkRow(firstindex,arr[k]) && checkBox(firstindex,arr[k]) && columnCheck(firstindex,arr[k])){
                            sudoku[firstindex] = arr[k]
                            if(checkNoOfSolution(sudoku) === true){
                                return true
                            }else{
                                sudoku[firstindex] = 0
                            }
                        }
                        
                    }

                    return false
                }
            }
            // resultarr.push(sudoku)
            count +=1;
            
        
        }

        function fillsudoku(sudoku){
        
            for(let firstindex=0;firstindex<81;firstindex++)
            {
                if(sudoku[firstindex] === 0)
                {
                    for(let j=0;j<=9;j++)
                    {
                        let arr = [1,2,3,4,5,6,7,8,9]
                        let number = arr[Math.floor(Math.random()*arr.length)]
                        if(checkRow(firstindex,number) && checkBox(firstindex,number) && columnCheck(firstindex,number))
                        {
                            sudoku[firstindex] = number
                            if(fillsudoku(sudoku) === true){
                                return true;
                            }
                            else{
                                sudoku[firstindex] = 0 
                            }       
                        }
                        
                    }
                    
                    return false
                }
            }
            return true
        }

        function removeElements(sudoku){
        
            for(let i = 1;i<=35;i++){
                let index = Math.floor(Math.random()*81)
                if(sudoku[index]!==0){
                    sudoku[index] = 0
                    checkNoOfSolution([...sudoku])
                    if(count === 1){
                        sudoku[index] = 0
                        
                    }
                }
            }
        }

        function checkRow(index,number){
            let rowFlag;
            let startRow = index-(index % 9)
            for(let i = startRow; i < (startRow + 9); i++){
                if(sudoku[i] === number){
                    rowFlag = false;
                    return rowFlag
                }
            }
            return true
        }
    
        function columnCheck(index,number){
            let columnFlag;
            let startColumn = index % 9
            for(let i = startColumn; i < sudoku.length; i+=9){
                if(sudoku[i] === number){
                    columnFlag = false;
                    return columnFlag
                }
            }
            return true
        }
    
        function checkBox(index,number){
            let boxflag;
            let row = Math.floor(index / 9)
            let column = Math.floor(index % 9)
            let startrow = Math.floor(row / 3 ) * 3
            let startcolumn = Math.floor(column / 3) * 3
    
            for(let r = startrow; r < startrow+3; r++){
                for(let c= startcolumn; c < startcolumn+3; c++){
                    let finalIndex = (r*9 + c)
                    if(sudoku[finalIndex] === number){
                        boxflag = false;
                        return boxflag
                    }
                }
            }
            return true
    
        }

            const handleReload = () => {
                
                window.location.reload()
            }

            const checkSuccess = () => {
                let flag;
               
                for(let i=0;i<81;i++){
                    if(board[i] !== ''){
                        flag=true;
                    }else{
                  flag=false
                    }
                    
                }
                
                debugger;
                if(flag){
                    //  alert('congratulations')
                    Store.addNotification({
                        title: "Congratulations!!",
                       message:"Good work on the puzzle!!",
                        type: 'success',
                       insert: "top",
                       container: "top-centre",
                       animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                       width: 350,
                        dismiss: {
                          duration: 3000,
                          onScreen: true
                       }
                      });
                }else{
                    // alert('not yet!!')
                    Store.addNotification({
                        title: "Puzzle is not completed yet!",
                        message:"finish the game!",
                        type: 'danger',
                       insert: "center",
                        container: "center",
                       animationIn: ["animated", "fadeIn"],
                       animationOut: ["animated", "fadeOut"],
                        width: 350,
                        dismiss: {
                          duration: 3000,
                         onScreen: true
                        }
                      });
                }
            }

            const evaluateValue = (inputValue,index) => {
                let iValue = Number(inputValue)
                if(iValue === 0 || iValue > 9 || iValue < 0){
                    alert('invalid input')
                    let _myInput = [...myInput]
                    _myInput[index] = ''
                    setMyInput(_myInput)
                    return
                }
               

                if(isRowValid(iValue,index) || isColumnValid(iValue,index) || isBoxValid(iValue,index)){
                    console.log('element not valid')
                    setCellState(index)
                    return;
                }

                let _myInput = [...myInput]
                _myInput[index] = iValue
                setMyInput(_myInput)
                setCellState(false)
            }

            function isRowValid(element,index){
                let rowFlag;
                let startRow = index-(index % 9)
                for(let i = startRow; i < (startRow + 9); i++){
                    if(myInput[i] === element){
                        console.log(myInput[i])
                        rowFlag = true;
                        return rowFlag
                    }
                }
            }

            function isColumnValid(element,index){
                let columnFlag;
                let startColumn = index % 9
                for(let i = startColumn; i < board.length; i+=9){
                    if(myInput[i] === element){
                        columnFlag = true;
                        return columnFlag
                    }
                }
            }

            function isBoxValid(element,index){
                let boxflag;
                let row = Math.floor(index / 9)
                let column = Math.floor(index % 9)
                let startrow = Math.floor(row / 3 ) * 3
                let startcolumn = Math.floor(column / 3) * 3

                for(let r = startrow; r < startrow+3; r++){
                    for(let c= startcolumn; c < startcolumn+3; c++){
                        let finalIndex = (r*9 + c)
                        if(myInput[finalIndex] === element){
                            boxflag = true;
                            return boxflag
                        }
                    }
                }

            }
            
            
            return(
                <div> 
                    <h1>Complete Sudoku</h1>
                    <br></br>
                    <div className='sudoku-container'>
                        <div className='sudoku-grid'>
                            {
                                myInput.map((blockValue,boardIndex)=>(
                                    <input className={boardIndex === cellState ? 'wrong-cell' : 'cell'} type='number' value={blockValue} key={boardIndex} min="1" max="9" onChange={(e) => evaluateValue(e.target.value,boardIndex)}/>
                                ))
                                
                            }
                        </div>
                        <br></br>
                        <div className='button-container'>
                            <button onClick={handleReload}>NewGame</button>
                        
                            <button onClick={checkSuccess}>Finish game</button>
                        </div>
                        
                    </div>
                </div>
            )
        

        }
