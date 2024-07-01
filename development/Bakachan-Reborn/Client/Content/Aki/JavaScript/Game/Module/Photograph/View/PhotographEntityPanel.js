"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.EntityIconItem =
		exports.EntityInfoItem =
		exports.PhotographEntityPanel =
			void 0);
const UE = require("ue"),
	Log_1 = require("../../../../Core/Common/Log"),
	PublicUtil_1 = require("../../../Common/PublicUtil"),
	UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
	LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
	GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
	LguiUtil_1 = require("../../Util/LguiUtil"),
	PhotographController_1 = require("../PhotographController");
class PhotographEntityPanel extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(...arguments),
			(this.EWi = void 0),
			(this.yWi = void 0),
			(this.IWi = new Map()),
			(this.TWi = new Map()),
			(this.xPt = (e, t, i) => {
				var o = new EntityInfoItem();
				return (
					o.SetRootActor(t.GetOwner(), !0),
					o.InitSpr(),
					o.Refresh(e),
					{ Key: i, Value: o }
				);
			});
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIVerticalLayout],
			[2, UE.UIItem],
			[3, UE.UIItem],
			[4, UE.UIItem],
			[5, UE.UIItem],
		];
	}
	OnStart() {
		(this.EWi = new GenericLayoutNew_1.GenericLayoutNew(
			this.GetVerticalLayout(1),
			this.xPt,
		)),
			(this.yWi = this.GetItem(5)),
			PhotographController_1.PhotographController.CloseBlackScreen();
	}
	OnBeforeDestroy() {
		this.EWi && (this.EWi.ClearChildren(), (this.EWi = void 0)),
			this.IWi.clear(),
			this.TWi.clear(),
			(this.yWi = void 0);
	}
	Refresh(e) {
		this.IWi.clear();
		for (let t = 0; t < e.length; t++) this.IWi.set(e[t].Text, t);
		this.EWi.RebuildLayoutByDataNew(e);
	}
	SetInfoPanelVisible(e) {
		this.GetVerticalLayout(1).RootUIComp.SetUIActive(e);
	}
	UpdateIcons(e) {
		e.length <= 0 &&
			this.TWi.forEach((e) => {
				this.Move(e, new UE.Vector2D(0, 0), !0);
			});
		for (const i of e) {
			var t;
			this.TWi.has(i.Id)
				? this.Move(this.TWi.get(i.Id), i.Vector, i.NotShow)
				: ((t = new EntityIconItem(
						LguiUtil_1.LguiUtil.CopyItem(this.yWi, this.GetItem(0)),
					)).CreateByActorAsync(t.GetItsItem().GetOwner()),
					t
						? (t.SetUiActive(!0),
							t.InitSpr(),
							this.TWi.set(i.Id, t),
							this.Move(t, i.Vector, !0))
						: Log_1.Log.CheckInfo() &&
							Log_1.Log.Info("Photo", 46, "tempUiItem为空", ["名称：", i.Id]));
		}
	}
	Move(e, t, i) {
		var o = e.GetItsItem();
		o.SetUIActive(!0),
			o.SetAnchorOffset(new UE.Vector2D(t.X, t.Y)),
			i
				? e.UpdateNowIcon(0)
				: e.UpdateNowIcon(
						PhotographController_1.PhotographController.IsLastChecked ? 2 : 1,
					);
	}
	GetInfoItemByDesc(e) {
		if (void 0 !== (e = this.IWi.get(e)))
			return this.EWi.GetLayoutItemByIndex(e);
	}
}
exports.PhotographEntityPanel = PhotographEntityPanel;
class EntityInfoItem extends UiPanelBase_1.UiPanelBase {
	constructor() {
		super(), (this.UiSequencePlayer = void 0), (this.ILr = !1);
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
			[2, UE.UIText],
		];
	}
	InitSpr() {
		this.UiSequencePlayer ||
			(this.UiSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				this.GetRootItem(),
			)),
			this.UiSequencePlayer.StopCurrentSequence(!1, !0),
			this.UiSequencePlayer.PlayLevelSequenceByName("Fail"),
			(this.ILr = !1);
	}
	Refresh(e) {
		var t = PublicUtil_1.PublicUtil.GetConfigTextByKey(e.Text);
		t && this.GetText(2).SetText(t), this.RefreshFinishState(e.IsFinish);
	}
	RefreshFinishState(e) {
		e && !this.ILr
			? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
				this.UiSequencePlayer.PlayLevelSequenceByName("Complete"),
				(this.ILr = !0))
			: !e &&
				this.ILr &&
				(this.UiSequencePlayer.StopCurrentSequence(!1, !0),
				this.UiSequencePlayer.PlayLevelSequenceByName("Fail"),
				(this.ILr = !1));
	}
}
exports.EntityInfoItem = EntityInfoItem;
class EntityIconItem extends UiPanelBase_1.UiPanelBase {
	constructor(e) {
		super(),
			(this.UiSequencePlayer = void 0),
			(this.Item = void 0),
			(this.ItsColor = 0),
			(this.Item = e),
			(this.UiSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
				e,
			));
	}
	GetItsItem() {
		return this.Item;
	}
	OnRegisterComponent() {
		this.ComponentRegisterInfos = [
			[0, UE.UIItem],
			[1, UE.UIItem],
		];
	}
	InitSpr() {
		this.GetItem(0)?.SetUIActive(!1), this.GetItem(1)?.SetUIActive(!1);
	}
	UpdateNowIcon(e) {
		switch (e) {
			case 2:
				0 === this.ItsColor
					? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
						this.UiSequencePlayer.PlayLevelSequenceByName("NtoG"),
						(this.ItsColor = 2))
					: 1 === this.ItsColor &&
						(this.UiSequencePlayer.StopCurrentSequence(!1, !0),
						this.UiSequencePlayer.PlayLevelSequenceByName("YtoG"),
						(this.ItsColor = 2));
				break;
			case 1:
				0 === this.ItsColor
					? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
						this.UiSequencePlayer.PlayLevelSequenceByName("NtoY"),
						(this.ItsColor = 1))
					: 2 === this.ItsColor &&
						(this.UiSequencePlayer.StopCurrentSequence(!1, !0),
						this.UiSequencePlayer.PlayLevelSequenceByName("GtoY"),
						(this.ItsColor = 1));
				break;
			case 0:
				2 === this.ItsColor
					? (this.UiSequencePlayer.StopCurrentSequence(!1, !0),
						this.UiSequencePlayer.PlayLevelSequenceByName("GtoN"),
						(this.ItsColor = 0))
					: 1 === this.ItsColor &&
						(this.UiSequencePlayer.StopCurrentSequence(!1, !0),
						this.UiSequencePlayer.PlayLevelSequenceByName("YtoN"),
						(this.ItsColor = 0));
		}
	}
}
exports.EntityIconItem = EntityIconItem;
