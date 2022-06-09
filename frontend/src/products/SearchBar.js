import { TextField, Button, Select, InputLabel, MenuItem, FormControl } from '@mui/material'
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
        <FormControl sx={{width: '10%'}}>
            <InputLabel id="cat-label">Category</InputLabel>
            <Select labelId="cat-label" label="Category" size="small" value={category} onChange={onCategorySelect}> 
                <MenuItem value="All">All</MenuItem>
                {categories.map(c => <MenuItem value={c}>{c}</MenuItem>)}
            </Select>
        </FormControl>


        <TextField onChange={handleChange} variant="outlined" label="Search for an item..." size="small" sx={{width: '35%', marginLeft: 1}} inputRef={searchRef} id="search"/>
        {/* <Button variant="contained" sx={{marginLeft: 1}} onClick={submit}>Search</Button> */}
        <Button variant="outlined" sx={{marginLeft: 1}} onClick={clear}>Clear</Button>
    </div>
    )
}

export default SearchBar;