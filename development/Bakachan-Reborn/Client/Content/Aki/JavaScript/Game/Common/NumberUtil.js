"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.NumberUtil = void 0);
const MultiTextLang_1 = require("../../Core/Define/ConfigQuery/MultiTextLang"),
	ConfigManager_1 = require("../Manager/ConfigManager");
class NumberUtil {
	static GetNumberLocalText(e) {
		let t = "";
		return (
			1 === e
				? (t = "One")
				: 2 === e
					? (t = "Two")
					: 3 === e
						? (t = "Three")
						: 4 === e
							? (t = "Four")
							: 5 === e
								? (t = "Five")
								: 6 === e
									? (t = "Six")
									: 7 === e
										? (t = "Seven")
										: 8 === e
											? (t = "Eight")
											: 9 === e
												? (t = "Nine")
												: 10 === e && (t = "Ten"),
			(e = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(t)),
			MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? ""
		);
	}
}
exports.NumberUtil = NumberUtil;
