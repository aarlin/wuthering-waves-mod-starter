"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapUtil = void 0);
const Vector2D_1 = require("../../../Core/Utils/Math/Vector2D"),
	ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils"),
	UiLayer_1 = require("../../Ui/UiLayer");
class WorldMapUtil {
	static GetViewportSize() {
		return ObjectUtils_1.ObjectUtils.IsValid(UiLayer_1.UiLayer.UiRootItem)
			? Vector2D_1.Vector2D.Create(
					UiLayer_1.UiLayer.UiRootItem.GetWidth(),
					UiLayer_1.UiLayer.UiRootItem.GetHeight(),
				)
			: Vector2D_1.Vector2D.Create();
	}
	static GetViewportSizeByPool() {
		return ObjectUtils_1.ObjectUtils.IsValid(UiLayer_1.UiLayer.UiRootItem)
			? Vector2D_1.Vector2D.Create(
					UiLayer_1.UiLayer.UiRootItem.GetWidth(),
					UiLayer_1.UiLayer.UiRootItem.GetHeight(),
				)
			: Vector2D_1.Vector2D.Create();
	}
}
exports.WorldMapUtil = WorldMapUtil;
