"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.BattleUiSetPanelItemData = void 0);
class BattleUiSetPanelItemData {
	constructor(t, e) {
		(this.HierarchyIndex = -1),
			(this.EditorHierarchyIndex = -1),
			(this.SourceHierarchyIndex = -1),
			(this.PanelIndex = e.PanelIndex),
			(this.PanelItemIndex = t),
			(this.ConfigId = e.Id),
			(this.Size = e.SourceSize),
			(this.EditSize = this.Size),
			(this.SourceSize = this.Size),
			(this.Alpha = e.SourceAlpha),
			(this.EditAlpha = this.Alpha),
			(this.SourceAlpha = this.Alpha),
			(this.OffsetX = e.SourceOffsetX),
			(this.EditOffsetX = this.OffsetX),
			(this.SourceOffsetX = this.OffsetX),
			(this.OffsetY = e.SourceOffsetY),
			(this.EditOffsetY = this.OffsetY),
			(this.SourceOffsetY = this.OffsetY),
			(this.he = e.Name),
			(this.CanEdit = e.CanEdit),
			(this.IsDefaultSelected = e.IsDefaultSelected),
			(this.IsCheckOverlap = e.IsCheckOverlap),
			(this.HierarchyIndex = e.SourceHierarchyIndex),
			(this.EditorHierarchyIndex = this.HierarchyIndex),
			(this.SourceHierarchyIndex = this.HierarchyIndex);
	}
	ReInit() {
		(this.EditSize = this.Size),
			(this.EditAlpha = this.Alpha),
			(this.EditOffsetX = this.OffsetX),
			(this.EditOffsetY = this.OffsetY);
	}
	IsEdited() {
		return (
			this.EditSize !== this.Size ||
			this.EditAlpha !== this.Alpha ||
			this.EditOffsetY !== this.OffsetY ||
			this.EditOffsetX !== this.OffsetX
		);
	}
	IsInitialized() {
		return (
			0 !== this.Size ||
			0 !== this.Alpha ||
			0 !== this.OffsetX ||
			0 !== this.OffsetY
		);
	}
	GetDebugString() {
		return (
			`按键名称：${this.he}，尺寸：${this.Size}，透明度：${this.Alpha}，位置：${this.OffsetX},` +
			this.OffsetY
		);
	}
}
exports.BattleUiSetPanelItemData = BattleUiSetPanelItemData;
