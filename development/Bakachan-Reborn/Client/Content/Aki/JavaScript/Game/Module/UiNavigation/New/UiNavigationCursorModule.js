"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.UiNavigationCursorModule = void 0);
const UE = require("ue");
class UiNavigationCursorModule {
	constructor(e) {
		(this.Lwo = void 0), (this.Lwo = e);
	}
	GetCursorOffset() {
		return 0 === this.Lwo.OffsetType
			? new UE.Vector2D(0, 0.5)
			: 1 === this.Lwo.OffsetType
				? new UE.Vector2D(0.5, 1)
				: 2 === this.Lwo.OffsetType
					? new UE.Vector2D(1, 0.5)
					: 3 === this.Lwo.OffsetType
						? new UE.Vector2D(0.5, 0)
						: new UE.Vector2D(0, 0);
	}
	GetBoundOffset() {
		return 0 === this.Lwo.OffsetType
			? new UE.Vector2D(-this.Lwo.BoundOffset, 0)
			: 1 === this.Lwo.OffsetType
				? new UE.Vector2D(0, this.Lwo.BoundOffset)
				: 2 === this.Lwo.OffsetType
					? new UE.Vector2D(this.Lwo.BoundOffset, 0)
					: 3 === this.Lwo.OffsetType
						? new UE.Vector2D(0, -this.Lwo.BoundOffset)
						: new UE.Vector2D(0, 0);
	}
}
exports.UiNavigationCursorModule = UiNavigationCursorModule;
