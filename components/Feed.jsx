'use client'
import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {

    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {

    const [posts, setPosts] = useState([])
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const filterPromptFunc = (query) => {
        const patternMatch = new RegExp(query, 'i');
        return posts.filter(
            (item) =>
                patternMatch.test(item.creator.username) ||
                patternMatch.test(item.prompt) ||
                patternMatch.test(item.tag))
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPromptFunc(e.target.value);
                setSearchedResults(searchResult)
            }, 500)
        );

    };

    const handleTagClick = (tag) => {
        setSearchText(tag)

        const searchResult = filterPromptFunc(tag)

        setSearchedResults(searchResult)

    };


    const fetchPost = async () => {
        const response = await fetch('/api/prompt')
        const data = await response.json();
        setPosts(data)
    }

    useEffect(() => {
        fetchPost()
    }, [])

    return (
        <section className="feed">

            <form className="relative w-full flex-center">
                <input type="text" name="input" id="input"
                    placeholder="Search for a tag or username"
                    className="search_input peer"
                    onChange={handleSearchChange}
                    value={searchText}
                    required
                />
            </form>

            <PromptCardList
                data={searchText ? searchedResults : posts}
                handleTagClick={handleTagClick}
            />

        </section>
    )
}

export default Feed