"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.SubtitleOptionItem = void 0);
const UE = require("ue"),
	TalkOptionIconById_1 = require("../../../../Core/Define/ConfigQuery/TalkOptionIconById"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	ToggleActionItem_1 = require("../../Common/Toggle/ToggleActionItem"),
	SequenceController_1 = require("../../Plot/Sequence/SequenceController"),
	GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class SubtitleOptionItem extends GridProxyAbstract_1.GridProxyAbstract {
	constructor(t) {
		super(),
			(this.$1i = void 0),
			(this.OptionIndex = 0),
			(this.TJi = void 0),
			(this.OptionClick = (t) => {
				SequenceController_1.SequenceController.SelectOption(this.OptionIndex);
			}),
			(this.TJi = t);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	OnStart() {
		(this.$1i = new ToggleActionItem_1.ToggleActionItem(this.GetItem(0))),
			this.$1i.SetFunction(this.OptionClick),
			this.$1i.GetToggleItem().SetToggleState(0),
			this.LJi(),
			this.$1i.ShowSequenceOnBegin();
	}
	OnBeforeDestroy() {
		this.DJi(), this.$1i.Destroy();
	}
	LJi() {
		this.$1i.GetToggleItem().OnHover.Add(() => {
			var t = this.TJi.GetOptionList()[this.TJi.HoverIndex];
			t && t.SetFollowItemActive(!1),
				(this.TJi.HoverIndex = this.OptionIndex),
				this.SetFollowItemActive(!0);
		});
	}
	DJi() {
		this.$1i.GetToggleItem().OnHover.Clear();
	}
	SetFollowItemActive(t) {
		this.GetItem(1).SetUIActive(t);
	}
	SetupSubtitleOption(t, e, i) {
		(this.OptionIndex = e),
			(e = this.cvo(i)),
			this.$1i.SetToggleTexture(e),
			this.$1i.SetToggleText(t),
			(i = this.TJi.HoverIndex),
			this.SetFollowItemActive(i === this.OptionIndex);
	}
	cvo(t) {
		return (
			(t = t ?? 1),
			(t = TalkOptionIconById_1.configTalkOptionIconById.GetConfig(t))
				? t.Icon
				: ""
		);
	}
	Refresh(t, e, i) {
		(t = PublicUtil_1.PublicUtil.GetFlowConfigLocalText(t)),
			(t = this.TJi.ParseSubtitle(t));
		var o = i < this.TJi.OsList.length ? this.TJi.OsList[i] : 1;
		this.SetupSubtitleOption(t, i, o),
			this.$1i.GetToggleItem().SetToggleState(0);
	}
}
exports.SubtitleOptionItem = SubtitleOptionItem;
