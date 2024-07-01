"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.MemoryDetailAttachItem = void 0);
const UE = require("ue"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	AutoAttachItem_1 = require("../AutoAttach/AutoAttachItem"),
	LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
	LguiUtil_1 = require("../Util/LguiUtil");
class MemoryDetailAttachItem extends AutoAttachItem_1.AutoAttachItem {
	constructor() {
		super(...arguments),
			(this.Y6i = void 0),
			(this.I7e = 0),
			(this.EPe = void 0),
			(this.Nft = !1);
	}
	OnRegisterComponent() {
		(this.ComponentRegisterInfos = [
			[0, UE.UISprite],
			[1, UE.UISprite],
			[2, UE.UIText],
			[3, UE.UIText],
			[4, UE.UIItem],
			[5, UE.UIExtendToggle],
		]),
			(this.BtnBindInfo = [
				[
					5,
					() => {
						EventSystem_1.EventSystem.Emit(
							EventDefine_1.EEventName.OnFragmentTopicClick,
							this.I7e,
						);
					},
				],
			]);
	}
	Sbn() {
		void 0 === this.EPe &&
			(this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
	}
	OnRefreshItem(e) {
		this.Sbn(),
			-1 === (this.I7e = e)
				? (this.Y6i = void 0)
				: ((e =
						ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
							e,
						)),
					(this.Y6i = e)),
			this.k5e(),
			this.KUn(),
			this.Wbe(),
			this.J8e();
	}
	J8e() {
		-1 === this.I7e
			? (this.SetSpriteByPath(
					ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetTopicNotOpenTexturePath(),
					this.GetSprite(0),
					!1,
				),
				this.SetSpriteByPath(
					ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetTopicNotOpenTextureLightPath(),
					this.GetSprite(1),
					!1,
				))
			: (this.SetSpriteByPath(this.Y6i.BgResource, this.GetSprite(0), !1),
				this.SetSpriteByPath(this.Y6i.BgResourceLight, this.GetSprite(1), !1));
	}
	Wbe() {
		-1 === this.I7e || void 0 === this.Y6i
			? LguiUtil_1.LguiUtil.SetLocalTextNew(
					this.GetText(2),
					"FragmentMemoryNotOpen",
				)
			: this.GetText(2)?.ShowTextNew(this.Y6i.Title);
	}
	KUn() {
		if (-1 === this.I7e || void 0 === this.Y6i) this.GetText(3)?.SetText("");
		else {
			var e =
				ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectConfigListByTopicId(
					this.Y6i.Id,
				);
			let i = 0;
			for (const n of e) {
				var t =
					ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectDataById(
						n.Id,
					);
				t && t.GetIfUnlock() && i++;
			}
			LguiUtil_1.LguiUtil.SetLocalTextNew(
				this.GetText(3),
				"FragmentMemoryCollectProgress",
				i.toString(),
				e.length.toString(),
			);
		}
	}
	k5e() {
		if (void 0 === this.Y6i) this.GetItem(4)?.SetUIActive(!1);
		else {
			var e = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
				this.Y6i.Id,
			);
			let t = !1;
			e && e.GetAllCollectState() && (t = !0), this.GetItem(4)?.SetUIActive(t);
		}
	}
	OnSelect() {
		this.GetExtendToggle(5)?.SetToggleState(1),
			this.EPe?.StopCurrentSequence(),
			this.EPe?.PlaySequencePurely("Select"),
			EventSystem_1.EventSystem.Emit(
				EventDefine_1.EEventName.OnFragmentTopicSelect,
				this.I7e,
			),
			(this.Nft = !0);
	}
	OnUnSelect() {
		this.Nft && this.EPe?.PlaySequencePurely("Unselect"),
			this.GetExtendToggle(5)?.SetToggleState(0),
			(this.Nft = !1);
	}
	OnMoveItem() {}
}
exports.MemoryDetailAttachItem = MemoryDetailAttachItem;
