import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import Head from './head'
import Header from './header'

const Repos = () => {
  const { userName } = useParams()
  const [repos, setRepos] = useState([])

  useEffect(() => {
    fetch(`https://api.github.com/users/${userName}/repos`)
      .then((result) => result.json())
      .then((list) => {
        setRepos(list)
      })
    return () => {}
  }, [userName])
  return (
    <div>
      <Head title="Repos" />
      <Header user={userName} />
      <div className="flex items-center justify-center h-full">
        <div className="bg-indigo-800 hover:text-red-500 text-white font-semibold rounded-lg border shadow-lg py-4 px-6">
          <ol className="list-decimal list-inside">
            {repos.map((repo) => {
              return (
                <li key={repo.id}>
                  <Link to={`/${userName}/${repo.name}`}>{repo.name}</Link>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}

Repos.propTypes = {}

export default React.memo(Repos)
