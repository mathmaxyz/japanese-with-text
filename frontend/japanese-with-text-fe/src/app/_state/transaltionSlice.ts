import { createSlice } from "@reduxjs/toolkit";
import Translation from "../_types/translation";

interface TranslationState {
	translationData: Translation[];
}

const initialState: TranslationState = {
	translationData: []
}

const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {

	}
})


