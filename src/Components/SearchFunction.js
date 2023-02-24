import React from "react";
import {useSearchParams} from "react-router-dom";

export default function SearchFunction() {
	const [searchParams, setSearchParams] = useSearchParams();
	console.log("from search params",searchParams.get("query"));
	let pp=searchParams.get("query");
	return (
		<div>
			hello world ! from search {pp}
		</div>
	);
}
