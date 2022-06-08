import { TextField, Button } from '@mui/material'
import { useRef } from "react"

const SearchBar = (props) => {
    const {setInput} = props;
    const searchRef = useRef();

    // const submit = (e) => {
    //     e.preventDefault();
    //     let lowercase = searchRef.current.value.toLowerCase();
    //     setInput(lowercase);
    // }
    
    const handleChange = (e) => {
        let lowercase = e.target.value.toLowerCase();
        setInput(lowercase);
    }

    const clear = (e) => {
        e.preventDefault();
        setInput("");
        document.getElementById("search").value = "";
    }

    return(
    <div style={{ marginTop: '30px'}}>
        <TextField onChange={handleChange} variant="outlined" label="Search for an item..." size="small" sx={{width: '35%'}} inputRef={searchRef} id="search"/>
        {/* <Button variant="contained" sx={{marginLeft: 1}} onClick={submit}>Search</Button> */}
        <Button variant="outlined" sx={{marginLeft: 1}} onClick={clear}>Clear</Button>
    </div>
    )
}

export default SearchBar;