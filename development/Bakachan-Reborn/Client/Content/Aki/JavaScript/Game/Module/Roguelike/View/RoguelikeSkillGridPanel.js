"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.RoguelikeSkillGridPanel = void 0);
const UE = require("ue"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	RoguelikeSkillNode_1 = require("./RoguelikeSkillNode");
class RoguelikeSkillGridPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(),
			(this.ScrollViewDelegate = void 0),
			(this.GridIndex = 0),
			(this.DisplayIndex = 0),
			(this.NodeMap = []),
			(this.NodeDataList = []);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIItem],
		];
	}
	GetNodeByPos(e) {
		return this.NodeMap[e];
	}
	OnStart() {}
	BuildNode() {
		for (const i of this.NodeDataList) {
			var e = this.GetItem(0 + i.Row);
			const t = new RoguelikeSkillNode_1.RoguelikeSkillNode(
				e,
				i,
				this.RootItem,
			);
			(this.NodeMap[i.Row] = t)
				.CreateThenShowByResourceIdAsync("RoguelikeSkillNodeB", e)
				.then(() => {
					t.Refresh();
				});
		}
	}
	Refresh(e, i, t) {
		(this.NodeDataList = e), this.BuildNode();
	}
	Clear() {}
	OnSelected(e) {}
	OnDeselected(e) {}
	GetKey(e, i) {}
}
exports.RoguelikeSkillGridPanel = RoguelikeSkillGridPanel;
