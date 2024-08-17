"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
	(exports.FoleySynthHandlerBase = void 0);
const UE = require("ue"),
	Log_1 = require("../../../../../../../Core/Common/Log"),
	Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
	MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
	CharacterNameDefines_1 = require("../../../CharacterNameDefines");
class FoleySynthRecord {
	constructor() {
		(this.Speed = 0), (this.BoneSpeed = 0), (this.Acceleration = 0);
	}
}
class FoleySynthDynamicConfig {
	constructor() {
		this.State = -1;
	}
}
class FoleySynthHandlerBase {
	constructor(e, t, o) {
		(this.ActorComp = e),
			(this.AkComp = t),
			(this.RecordCount = o),
			(this.UeAkComp = void 0),
			(this.FoleySynthRecordsModel = new Array()),
			(this.FoleySynthModelConfigs = new Array()),
			(this.FoleySynthModelDynamicConfigs = new Array()),
			(this.PreModelBoneComponentLocations = new Array()),
			(this.RecordIndex = 0),
			(this.RecordTickCount = 0),
			(this.RecordErrorFlag = 0),
			(this.TempVector = Vector_1.Vector.Create()),
			(this.TempBoneLocation = Vector_1.Vector.Create()),
			(this.IsActive = !1),
			(this.SavedRecords = ""),
			(this.IsDebug = !1),
			(this.SavedPath = ""),
			(this.DebugTime = -0);
	}
	Init(e) {
		this.OnInit(e),
			(this.RecordIndex = 0),
			(this.RecordErrorFlag = 0),
			(this.RecordTickCount = 0),
			(this.UeAkComp = this.AkComp.GetAkComponentBySocketName(
				CharacterNameDefines_1.CharacterNameDefines.HIT_CASE_NAME,
			)),
			(this.IsActive = !0);
		for (let e = 0; e < this.RecordCount; ++e) {
			var t = new Array();
			for (let e = 0; e < this.FoleySynthModelConfigs.length; ++e)
				t.push(new FoleySynthRecord());
			this.FoleySynthRecordsModel.push(t);
		}
		for (let e = 0; e < this.FoleySynthModelConfigs.length; ++e)
			this.PreModelBoneComponentLocations.push(Vector_1.Vector.Create()),
				this.FoleySynthModelDynamicConfigs.push(new FoleySynthDynamicConfig());
	}
	OnInit(e) {}
	Tick(e) {
		this.IsActive && this.I$o(e);
	}
	SetActive(e) {
		this.IsActive = e;
	}
	Clear() {
		(this.ActorComp = void 0), (this.AkComp = void 0), (this.UeAkComp = void 0);
	}
	I$o(e) {
		(e *= MathUtils_1.MathUtils.MillisecondToSecond),
			this.IsDebug && (this.DebugTime += e),
			0 === this.RecordTickCount
				? (this.T$o(), ++this.RecordTickCount)
				: (this.L$o(e),
					this.RecordTickCount > this.RecordCount + this.RecordErrorFlag &&
						this.OnParseBoneSpeedForAudio(),
					++this.RecordTickCount,
					this.RecordTickCount === Number.MAX_VALUE &&
						((this.RecordTickCount = this.RecordCount),
						(this.RecordErrorFlag = 0)));
	}
	T$o() {
		for (let t = 0; t < this.FoleySynthModelConfigs.length; ++t) {
			var e = this.FoleySynthModelConfigs[t];
			e = this.ActorComp.Actor.Mesh.GetSocketTransform(e.BoneName, 2);
			this.PreModelBoneComponentLocations[t].DeepCopy(e.GetTranslation());
		}
	}
	L$o(e) {
		this.RecordIndex = (this.RecordIndex + 1) % this.RecordCount;
		var t = this.GetPreRecordIndex(1);
		for (let n = 0; n < this.FoleySynthModelConfigs.length; ++n) {
			var o = this.FoleySynthModelConfigs[n],
				i = this.ActorComp.Actor.Mesh.GetSocketLocation(o.BoneName),
				s = (i =
					(this.TempBoneLocation.DeepCopy(i),
					this.TempBoneLocation.SubtractionEqual(
						this.ActorComp.ActorLocationProxy,
					),
					this.D$o(
						this.TempBoneLocation,
						this.PreModelBoneComponentLocations[n],
						e,
					)))[0],
				r =
					((i = i[1]),
					(s -
						(r =
							((this.FoleySynthRecordsModel[this.RecordIndex][n].Speed = s),
							(this.FoleySynthRecordsModel[this.RecordIndex][n].BoneSpeed = i),
							this.FoleySynthRecordsModel[t][n].Speed))) /
						e);
			(this.FoleySynthRecordsModel[this.RecordIndex][n].Acceleration = r),
				this.PreModelBoneComponentLocations[n].DeepCopy(this.TempBoneLocation),
				this.IsDebug && this.SaveDebugInfo(o.BoneName, s, r, i);
		}
	}
	OnParseBoneSpeedForAudio() {}
	D$o(e, t, o) {
		return (
			this.TempVector.DeepCopy(e),
			this.TempVector.SubtractionEqual(t),
			this.TempVector.DivisionEqual(o),
			(e = this.TempVector.Size()),
			this.TempVector.AdditionEqual(this.ActorComp.ActorVelocityProxy),
			[this.TempVector.Size(), e]
		);
	}
	GetPreRecordIndex(e) {
		return (this.RecordIndex + this.RecordCount - e) % this.RecordCount;
	}
	GetCurrentRecord(e) {
		return this.FoleySynthRecordsModel[this.RecordIndex][e];
	}
	SetDebug(e) {
		e
			? ((this.SavedPath =
					UE.KismetSystemLibrary.GetProjectDirectory() +
					"/Saved/FoleySynth/FoleySynthRecord_" +
					this.constructor?.name +
					"_" +
					this.ActorComp.Actor.GetName() +
					".txt"),
				UE.FileSystemOperation.FileExists(this.SavedPath) ||
					UE.FileSystemOperation.WriteFile(this.SavedPath, "Test........"),
				(this.SavedRecords = ""),
				(this.IsDebug = !0),
				(this.DebugTime = 0))
			: (UE.FileSystemOperation.WriteFile(this.SavedPath, this.SavedRecords),
				(this.SavedRecords = ""),
				(this.IsDebug = !1));
	}
	SaveDebugInfo(e, t, o, i) {
		this.IsDebug &&
			((e =
				e?.toString() +
				",speed:" +
				t.toString() +
				",acceleration:" +
				o.toString() +
				",boneSpeed:" +
				i.toString() +
				",debugTime:" +
				this.DebugTime.toString()),
			(this.SavedRecords = this.SavedRecords + "\n" + e),
			Log_1.Log.CheckInfo()) &&
			Log_1.Log.Info(
				"Audio",
				58,
				"-------------Ak[FoleySynth] Debug信息",
				["Actor", this.ActorComp.Actor.GetName()],
				["Info", e],
			);
	}
}
exports.FoleySynthHandlerBase = FoleySynthHandlerBase;
