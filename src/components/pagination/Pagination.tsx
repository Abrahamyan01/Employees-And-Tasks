import { useEffect, useState } from "react"
import "./pagination.css"

export const Pagination = ({ forTo, paginate }: { forTo: string, paginate: (n: number) => void }) => {
    const pageNumbers = []
    const [length, setLength] = useState<number>(2)
    useEffect(() => {
        const getLength = async () => {
            const response = await fetch(`https://rocky-temple-83495.herokuapp.com/${forTo}`)
            const data = await response.json()
            setLength(data.length)
        }
        getLength()
    }, [forTo])

    for (let i = 1; i < length / 6 + 1; i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map(n => {
                    return <li key={n} className="num"
                        onClick={(e) => {
                            e.preventDefault()
                            paginate(n)
                        }}
                    >
                        {n}
                    </li>
                })}
            </ul>
        </div>
    )
}
