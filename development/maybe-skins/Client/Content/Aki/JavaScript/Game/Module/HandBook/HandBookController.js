"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.HandBookController = void 0);
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
	Protocol_1 = require("../../../Core/Define/Net/Protocol"),
	EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
	Net_1 = require("../../../Core/Net/Net"),
	EventDefine_1 = require("../../Common/Event/EventDefine"),
	EventSystem_1 = require("../../Common/Event/EventSystem"),
	EffectSystem_1 = require("../../Effect/EffectSystem"),
	ConfigManager_1 = require("../../Manager/ConfigManager"),
	ControllerHolder_1 = require("../../Manager/ControllerHolder"),
	ModelManager_1 = require("../../Manager/ModelManager"),
	UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
	UiManager_1 = require("../../Ui/UiManager"),
	HandBookDefine_1 = require("./HandBookDefine");
class HandBookController extends UiControllerBase_1.UiControllerBase {
	static SetPhantomMeshShow(e, o) {}
	static SetWeaponMeshShow(e, o) {}
	static SetMonsterMeshShow(e, o) {}
	static SetAnimalMeshShow(e, o) {}
	static ClearEffect() {
		this.UZt &&
			(EffectSystem_1.EffectSystem.StopEffectById(
				this.UZt,
				"[HandBookController.ClearEffect] StopEffect",
				!1,
			),
			(this.UZt = 0));
	}
	static OnRegisterNetEvent() {
		Net_1.Net.Register(1235, (e) => {
			var o = ModelManager_1.ModelManager.HandBookModel.GetClientHandBookType(
				e.Ikn,
				e.NRs.qRs,
			);
			HandBookController.CheckConfigIsLegal(o, e.NRs.Ekn) &&
				(ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(
					e.Ikn,
					e.NRs,
				),
				e.FRs) &&
				this.AZt(e.Ikn, e.NRs);
		});
	}
	static AZt(e, o) {
		let t = "";
		e === Protocol_1.Aki.Protocol.Hks.Proto_Photograph &&
			((e = ConfigManager_1.ConfigManager.HandBookConfig.GetPlotHandBookConfig(
				o.Ekn,
			)),
			(t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name) ?? "")),
			t.length;
	}
	static PZt(e) {
		var o = [],
			t = [],
			a = [],
			n = [],
			r = [],
			l =
				(o.push(e.Texture),
				ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(2, e.Id));
		r.push(l.CreateTime),
			t.push(
				MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Descrtption),
			),
			a.push(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name)),
			(l = ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyTypeConfig(
				e.Type,
			)),
			((e =
				(n.push(
					MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
						l.TypeDescription,
					),
				),
				new HandBookDefine_1.HandBookPhotoData())).DescrtptionText = t),
			(e.TypeText = n),
			(e.NameText = a),
			(e.HandBookType = 2),
			(e.Index = 0),
			(e.TextureList = o),
			(e.DateText = r),
			(l = {
				ScreenShot: !1,
				IsPlayerInfoVisible: !1,
				IsHiddenBattleView: !1,
				HandBookPhotoData: e,
				GachaData: void 0,
			});
		UiManager_1.UiManager.OpenView("PhotoSaveView", l);
	}
	static SendIllustratedRedDotRequest() {
		var e = Protocol_1.Aki.Protocol.fes.create();
		Net_1.Net.Call(23335, e, (e) => {
			e &&
				ModelManager_1.ModelManager.HandBookModel.InitHandBookRedDotList(e.ORs);
		});
	}
	static async SendIllustratedInfoRequestAsync(e) {
		var o = Protocol_1.Aki.Protocol.pes.create(),
			t =
				((o.B5n =
					ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(
						e,
					)),
				await Net_1.Net.CallAsync(8040, o));
		if (t) {
			ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
			var a = t.kRs.length;
			for (let e = 0; e < a; e++) {
				var n = t.kRs[e];
				ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(
					n.Ikn,
					n.GRs,
				);
			}
			await Promise.resolve();
		}
	}
	static SendIllustratedInfoRequest(e) {
		var o = Protocol_1.Aki.Protocol.pes.create();
		(o.B5n =
			ModelManager_1.ModelManager.HandBookModel.GetServerHandBookTypeList(e)),
			Net_1.Net.Call(8040, o, (e) => {
				if (e) {
					ModelManager_1.ModelManager.HandBookModel.ClearHandBookActiveStateMap();
					var o = e.kRs.length;
					for (let a = 0; a < o; a++) {
						var t = e.kRs[a];
						ModelManager_1.ModelManager.HandBookModel.InitHandBookActiveStateMap(
							t.Ikn,
							t.GRs,
						);
					}
				}
			});
	}
	static SendIllustratedReadRequest(e, o) {
		const t = Protocol_1.Aki.Protocol.Ies.create();
		(t.Ikn =
			ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(e)),
			(t.Ekn = o),
			Net_1.Net.Call(11349, t, (o) => {
				o &&
					(o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								7305,
								o.Fms,
							)
						: ModelManager_1.ModelManager.HandBookModel.UpdateRedDot(e, t.Ekn));
			});
	}
	static SendIllustratedUnlockRequest(e, o) {
		const t = Protocol_1.Aki.Protocol.Ses.create();
		(t.Ikn =
			ModelManager_1.ModelManager.HandBookModel.GetServerHandBookType(e)),
			(t.Ekn = o),
			Net_1.Net.Call(17285, t, (o) => {
				o &&
					(o.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
						? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
								o.lkn,
								14283,
								o.Fms,
							)
						: (ModelManager_1.ModelManager.HandBookModel.UpdateHandBookActiveStateMap(
								t.Ikn,
								o.NRs,
							),
							this.AZt(t.Ikn, o.NRs),
							2 === e &&
								((o =
									ConfigManager_1.ConfigManager.HandBookConfig.GetGeographyHandBookConfig(
										o.NRs.Ekn,
									)),
								this.PZt(o))));
			});
	}
	static GetCollectProgress(e) {
		var o = [];
		let t,
			a = 0;
		switch (e) {
			case 0:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(0)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetMonsterHandBookConfigList());
				break;
			case 1:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(1)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetPhantomHandBookConfig());
				break;
			case 2:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(2)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetAllGeographyHandBookConfig());
				break;
			case 3:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(3)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetWeaponHandBookConfigList());
				break;
			case 4:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(4)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigList());
				break;
			case 5:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(5)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetItemHandBookConfigList());
				break;
			case 6:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(6)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetAllChipHandBookConfig());
				break;
			case 7:
				(a = ModelManager_1.ModelManager.HandBookModel.GetCollectCount(7)),
					(t =
						ConfigManager_1.ConfigManager.HandBookConfig.GetAllPlotHandBookConfig());
				break;
			default:
				return [0, 0];
		}
		return (o[0] = a), (o[1] = t.length), o;
	}
	static GetAllCollectProgress() {
		var e = [],
			o = this.GetCollectProgress(0),
			t = this.GetCollectProgress(1),
			a = this.GetCollectProgress(2),
			n = this.GetCollectProgress(3),
			r = this.GetCollectProgress(4),
			l = this.GetCollectProgress(5),
			i = this.GetCollectProgress(6),
			d = this.GetCollectProgress(7);
		return (
			(e[0] = o[0] + t[0] + a[0] + n[0] + r[0] + l[0] + i[0] + d[0]),
			(e[1] = o[1] + t[1] + a[1] + n[1] + r[1] + l[1] + i[1] + d[1]),
			e
		);
	}
	static CheckConfigIsLegal(e, o) {
		var t = ModelManager_1.ModelManager.HandBookModel.GetConfigListIdByType(e),
			a = t.length;
		for (let e = 0; e < a; e++) if (t[e] === o) return !0;
		return !1;
	}
	static OnAddEvents() {
		EventSystem_1.EventSystem.Add(
			EventDefine_1.EEventName.PlayerSenseTargetEnter,
			this.xZt,
		);
	}
	static OnRemoveEvents() {
		EventSystem_1.EventSystem.Remove(
			EventDefine_1.EEventName.PlayerSenseTargetEnter,
			this.xZt,
		);
	}
	static wZt(e) {
		return (
			!!(e =
				ConfigManager_1.ConfigManager.HandBookConfig.GetAnimalHandBookConfigByMeshId(
					e,
				)) &&
			!ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(4, e.Id)
		);
	}
}
((exports.HandBookController = HandBookController).UZt = 0),
	(HandBookController.xZt = (e) => {
		(e = EntitySystem_1.EntitySystem.Get(e)) &&
			(e = e.GetComponent(0)) &&
			e.GetEntityType() === Protocol_1.Aki.Protocol.wks.Proto_Animal &&
			((e = e.GetModelId()), HandBookController.wZt(e)) &&
			HandBookController.SendIllustratedUnlockRequest(4, e);
	});
