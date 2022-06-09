import { TextField, Button, Select, InputLabel, MenuItem } from '@mui/material'
import { useRef } from "react"

const SearchBar = (props) => {
    const {setInput, category, setCategory, categories} = props;
    const searchRef = useRef();
    
    const handleChange = (e) => {
        let lowercase = e.target.value.toLowerCase();
        setInput(lowercase);
    }

    const clear = (e) => {
        e.preventDefault();
        setInput("");
        document.getElementById("search").value = "";
    }

    const onCategorySelect = (e) => {
        setCategory(e.target.value);
    }

    return(
    <div style={{ marginTop: '30px'}}>
        <InputLabel id="cat-label">Category</InputLabel>
        <Select labelId="cat-label" label="Category" size="small" value={category} onChange={onCategorySelect} sx={{width: '10%'}}> 
            {categories.map(c => <MenuItem value={c}>{c}</MenuItem>)}
        </Select>


        <TextField onChange={handleChange} variant="outlined" label="Search for an item..." size="small" sx={{width: '35%', marginLeft: 1}} inputRef={searchRef} id="search"/>
        {/* <Button variant="contained" sx={{marginLeft: 1}} onClick={submit}>Search</Button> */}
        <Button variant="outlined" sx={{marginLeft: 1}} onClick={clear}>Clear</Button>
    </div>
    )
}

export default SearchBar;