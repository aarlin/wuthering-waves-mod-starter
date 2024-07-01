"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.WorldMapComponentBase = void 0);
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
	WorldMapUtil_1 = require("../WorldMapUtil");
class WorldMapComponentBase {
	constructor(e) {
		(this.Map = e),
			(this.ViewportSize = WorldMapUtil_1.WorldMapUtil.GetViewportSize()),
			(this.MapSize = Vector2D_1.Vector2D.Create(
				this.Map.GetRootItem().GetWidth(),
				this.Map.GetRootItem().GetHeight(),
			));
	}
	Begin() {
		this.OnBegin();
	}
	Show() {
		this.AddEventListener();
	}
	Hide() {
		this.RemoveEventListener();
	}
	Destroy() {
		this.OnDestroy(), (this.Map = void 0);
	}
	OnBegin() {}
	OnDestroy() {}
	AddEventListener() {}
	RemoveEventListener() {}
}
exports.WorldMapComponentBase = WorldMapComponentBase;
